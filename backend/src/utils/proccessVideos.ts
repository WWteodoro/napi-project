import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec as execCb } from "child_process";
import { PrismaClient } from "@prisma/client";
import { createUUID } from "./createUUID";
import { execFile } from "child_process";
import util from "util";

const prisma = new PrismaClient();
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const exec = promisify(execCb);

async function getFfmpegPath() {
  // Detectando se o backend está rodando dentro do app empacotado
  const isPackaged = !!process.env.PORTABLE_EXECUTABLE_DIR || process.env.NODE_ENV === "production";

  if (isPackaged) {
    // quando empacotado, o backend fica dentro de resources/backend/dist
    const base = path.join(process.cwd(), ".."); 
    return path.join(base, "ffmpeg", "ffmpeg.exe");
  }

  // modo dev
  return path.join(__dirname, "..", "resources", "ffmpeg", "ffmpeg.exe");
}

/*async function convertToMp4(inputPath: string): Promise<string> {
  const outputPath = inputPath.replace(/\.[^/.]+$/, ".mp4"); 

  console.log(`🎥 Convertendo ${path.basename(inputPath)} para MP4...`);
  const cmd = `ffmpeg -i "${inputPath}" -c:v libx264 -preset ultrafast -crf 23 -c:a aac -b:a 128k -movflags +faststart "${outputPath}" -y`;

  try {
    const { stdout, stderr } = await exec(cmd);
    console.log(`✅ Conversão concluída: ${outputPath}`);
    console.log("📤 FFmpeg stdout:", stdout);
    console.error("⚠️ FFmpeg stderr:", stderr);
    return outputPath;
  } catch (error) {
    console.error(`❌ Erro ao converter ${inputPath}:`, error);
    return inputPath; 
  }
} */

  const execFilePromise = util.promisify(execFile);

export async function convertToMp4(inputPath: string): Promise<string> {
  const ffmpegPath = await getFfmpegPath();
  const outputPath = inputPath.replace(/\.[^/.]+$/, ".mp4");

  console.log("🔍 FFmpeg em:", ffmpegPath);

  try {
    const { stdout, stderr } = await execFilePromise(ffmpegPath, [
      "-i", inputPath,
      "-c:v", "libx264",
      "-preset", "ultrafast",
      "-crf", "23",
      "-c:a", "aac",
      "-b:a", "128k",
      "-movflags", "+faststart",
      outputPath,
      "-y"
    ]);

    console.log(`🎥 Convertido para: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error("❌ Erro FFmpeg:", error);
    return inputPath;
  }
}

export async function countVideos(folderPath: string): Promise<number> {
  let count = 0;
  const files = await readdir(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      count += await countVideos(filePath); // recursivo
    } else if (fileStat.isFile() && file.toLowerCase().endsWith(".avi")) {
      count++;
    }
  }

  return count;
}


export async function processVideos(folderPath: string, sessionId: string): Promise<void> {
  const totalVideos = await countVideos(folderPath);
  console.log(`🎥 Total de vídeos para processar: ${totalVideos}`);

  const q = await prisma.session.findUnique({
    where: {id: sessionId}
  })

  if(q){

    let w = q.totalVideos + totalVideos

    await prisma.session.update({
      where: {id: sessionId},
      data: {totalVideos: w}
    })

}

  try {
    const files = await readdir(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileStat = await stat(filePath);

      if (fileStat.isDirectory()) {
        await processVideos(filePath, sessionId);
      } else if (fileStat.isFile() && file.toLowerCase().endsWith(".avi")) {
        const convertedPath = await convertToMp4(filePath); // 🔁 converter sempre
        const result = await checkVideo(convertedPath);

        if (result.error !== "OK") {
          console.warn(`⚠️ Erro ao processar ${file}: ${result.error}`);
          continue;
        }

        const videoId = createUUID();

        const fileUrl = "file:///" + convertedPath.replace(/\\/g, "/");
        const encodedUrl = encodeURI(fileUrl);

        const createdVideo = await prisma.video.create({
          data: {
            id: videoId,
            url: encodedUrl,
            sessionId,
            hasAnimals: result.has_animal,
            frameStride: result.frame_stride,
            totalFrames: result.total_frames,
            fps: result.fps,
            isAnnotated: false
          }
        });

        const boundingBoxes = [];

        for (let i = 0; i < result.times.length; i++) {
          const time = result.times[i];
          const bboxes = Array.isArray(result.bboxes[i]) ? result.bboxes[i] : [];
          const confidences = Array.isArray(result.confidences[i]) ? result.confidences[i] : [];

          for (let j = 0; j < bboxes.length; j++) {
            const bbox = bboxes[j];
            const confidence = confidences[j];

            if (bbox?.x0 != null && bbox?.y0 != null && bbox?.x1 != null && bbox?.y1 != null) {
              boundingBoxes.push({
                id: createUUID(),
                videoId: createdVideo.id,
                time,
                x0: bbox.x0,
                y0: bbox.y0,
                x1: bbox.x1,
                y1: bbox.y1,
                confidence,
              });
            }
          }
        }

        if (boundingBoxes.length > 0) {
          await prisma.boundingBox.createMany({ data: boundingBoxes });
        }
      }
      let r = await prisma.session.findUnique({
      where: {id: sessionId}
    })
    if(r){
    let j: number = r?.processedVideos + 1
      if(r.processedVideos < r.totalVideos){
        await prisma.session.update({
          where: {id: sessionId},
          data: {processedVideos: j}
        })
      }

  }
    }

    console.log("✅ Processamento concluído!");
    
  } catch (error) {
    console.error("❌ Erro ao processar vídeos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function checkVideo(filePath: string): Promise<any> {
  console.log(`🔍 Analisando ${filePath}...`);

  try {
    const fetch = require("node-fetch");
    const response = await fetch("http://127.0.0.1:5000/detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video_uri: filePath }),
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

    const result = await response.json();
    console.log("📊 Resultado da análise:", result);

    return result;
  } catch (error) {
    console.error(`❌ Erro ao analisar ${filePath}:`, error);
    return {
      error: "Falha ao conectar com o serviço Flask",
      has_animal: false,
      bboxes: [],
      confidences: [],
      frame_stride: 0,
      fps: 0,
      total_frames: 0,
      n_frames: 0,
      times: []
    };
  }
}