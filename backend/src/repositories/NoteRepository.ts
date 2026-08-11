    import { PrismaClient } from "@prisma/client";
    import { INoteRepository } from "../interfaces.ts/INoteRepository";
    import { INote, INoteGraphNoFilter, INoteGraphWithFilter } from "../interfaces.ts/INoteInterface";
    import { promises as fs } from 'fs';
    import path from 'path';
import { AppError } from "../errors/AppError";

    const prisma = new PrismaClient();
    export class NoteRepository implements INoteRepository{
        constructor(){}
      // Assumindo o formato das suas interfaces:
// interface INoteGraphNoFilter { placeId: string; }
// interface INoteGraphWithFilter { placeId: string; sessionIds?: string[]; }

async abundanciaDeAnimais(data: INoteGraphNoFilter): Promise<string> {
    const notes = await prisma.note.findMany({
        where: {
            video: { session: { placeId: data.placeId } }
        }
    });

    const map = new Map<string, number>();

    for (const note of notes) {
        // Soma a quantidade de indivíduos por espécie
        map.set(note.animal, (map.get(note.animal) || 0) + note.quantity);
    }

    return JSON.stringify({
        labels: Array.from(map.keys()),
        data: Array.from(map.values())
    });
}

async relogioBiologico(data: INoteGraphNoFilter): Promise<string> {
    const notes = await prisma.note.findMany({
        where: {
            video: { session: { placeId: data.placeId } }
        }
    });

    const map = new Map<string, number>();
    // Pré-preenche as 24 horas para garantir que o gráfico tenha todos os horários no eixo X
    for (let i = 0; i < 24; i++) {
        map.set(`${i.toString().padStart(2, '0')}h`, 0);
    }

    for (const note of notes) {
        // Extrai a hora do dateTime. Ex: "01/06/2026, 14:30:00" -> Pega o "14"
        const match = note.dateTime.match(/(\d{2}):\d{2}:\d{2}/);
        if (match) {
            const hourStr = `${match[1]}h`;
            map.set(hourStr, (map.get(hourStr) || 0) + note.quantity);
        }
    }

    return JSON.stringify({
        labels: Array.from(map.keys()),
        data: Array.from(map.values())
    });
}

async frequencia(data: INoteGraphWithFilter): Promise<string> {
    // Se o array de sessionIds existir e tiver itens, filtra por eles. Se não, pega todas as câmeras do local.
    const sessionFilter = data.sessionIds && data.sessionIds.length > 0 
        ? { id: { in: data.sessionIds } } 
        : { placeId: data.placeId };

    const notes = await prisma.note.findMany({
        where: { 
            video: { session: sessionFilter } 
        },
        include: {
            video: {
                include: { session: { select: { name: true } } }
            }
        }
    });

    const map = new Map<string, number>();

    for (const note of notes) {
        const camName = note.video?.session?.name || "Câmera Desconhecida";
        // Para frequência de aparição, contamos quantas vezes a câmera flagrou algo (+1 registro)
        map.set(camName, (map.get(camName) || 0) + 1); 
    }

    return JSON.stringify({
        labels: Array.from(map.keys()),
        data: Array.from(map.values())
    });
}

async tendencia(data: INoteGraphWithFilter): Promise<string> {
    const sessionFilter = data.sessionIds && data.sessionIds.length > 0 
        ? { id: { in: data.sessionIds } } 
        : { placeId: data.placeId };

    const notes = await prisma.note.findMany({
        where: { 
            video: { session: sessionFilter } 
        }
    });

    const map = new Map<string, number>();

    for (const note of notes) {
        // Extrai o Mês/Ano. Ex: "01/06/2026 14:30:00" -> Pega o "06/2026"
        const match = note.dateTime.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (match) {
            const mesAno = `${match[2]}/${match[3]}`; // Forma a string "MM/YYYY"
            map.set(mesAno, (map.get(mesAno) || 0) + note.quantity);
        }
    }

    // Ordenação cronológica das chaves (MM/YYYY) para a linha do gráfico não voltar no tempo
    const sortedKeys = Array.from(map.keys()).sort((a, b) => {
        const [mesA, anoA] = a.split('/').map(Number);
        const [mesB, anoB] = b.split('/').map(Number);
        return anoA !== anoB ? anoA - anoB : mesA - mesB;
    });

    const sortedData = sortedKeys.map(k => map.get(k)!);

    return JSON.stringify({
        labels: sortedKeys,
        data: sortedData
    });
}

        async get(id: string): Promise<INote> {
            const result = await prisma.note.findUnique({
                where: {id}
            })

            if(!result) throw new AppError("note not found")

            return result
        }

        async listByvideo(videoId: string): Promise<INote[]> {
            const notes = await prisma.note.findMany({
                where: {videoId : videoId}
    });
        return notes;
    }
        
    async findAll(): Promise<INote[]> {
            const result = await prisma.note.findMany()
            console.log("LISTANDO")
            return result
        }

        
    async create(props: INote): Promise<INote> {
    console.log("PROPS CHEGANDO:", props);
    
    try {
        // Tratamento do campo 'time'
        const timeValue = Array.isArray(props.time) ? props.time[0] : props.time;

        // Usamos o $transaction para realizar as duas operações juntas
        const result = await prisma.$transaction(async (tx) => {
            // 1. Cria a Nota
            const note = await tx.note.create({
                data: {
                    quantity: props.quantity,
                    dateTime: props.dateTime,
                    content: props.content,
                    animal: props.animal,
                    userId: props.userId,
                    videoId: props.videoId,
                    time: timeValue
                }
            });

            // 2. Atualiza o Vídeo correspondente para marcado como anotado
            await tx.video.update({
                where: { id: props.videoId },
                data: { isAnnotated: true }
            });

            return note;
        });

        console.log("GRAVOU NOTA E ATUALIZOU VÍDEO COM SUCESSO:", result.id);
        return result;
    } catch (e) {
        console.error("ERRO AO GRAVAR NOTA OU ATUALIZAR VÍDEO:", e);
        throw e;
    }
}

    async update(id: string, props: INote): Promise<INote> {
        console.log("here")
            const result = await prisma.note.update({
                where: {id},
                data: props
            })
            return result
        }

       
    async listBySession(sessionId: string): Promise<INote[]> {
        const notes = await prisma.note.findMany({
            where: {
            video: {
                sessionId: sessionId
                
            }
            }
        });

        return notes;
        }

async exportFullyCSV(placeId: string, outputPath: string): Promise<string> {
  // 1. Agora filtramos para pegar apenas as anotações cujo vídeo pertence a uma sessão deste Lugar
  const notes = await prisma.note.findMany({
    where: {
      video: {
        session: {
          placeId: placeId
        }
      }
    },
    include: {
      video: {
        select: { 
          url: true,
          session: {
            select: {
              latitude: true,
              longitude: true
            }
          }
        }
      }
    }
  });
  
  console.log(`Listando anotações do lugar ${placeId} para exportação global...`);

  const csvHeader = 'quantity,dateTime,location,content,animal,videoFileName\n';

  const csvRows = notes.map(note => {
    const videoFileName = note.video?.url ?? '';
    
    // Extraímos as coordenadas (com fallback para '--' caso não existam)
    const lat = note.video?.session?.latitude ?? '--';
    const lon = note.video?.session?.longitude ?? '--';
    const location = `Lat: ${lat} | Long: ${lon}`;

    return [
      note.quantity,
      note.dateTime,
      location,
      note.content,
      note.animal,
      videoFileName
    ]
      .map(field => `"${String(field ?? '')}"`)
      .join(',');
  });

  const csvContent = csvHeader + csvRows.join('\n');

  const stat = await fs.stat(outputPath).catch(() => null);

  let filePath: string;
  
  if (stat && stat.isDirectory()) {
    filePath = path.join(outputPath, `notes-lugar-${placeId}.csv`);
  } else if (!path.extname(outputPath)) {
    await fs.mkdir(outputPath, { recursive: true });
    filePath = path.join(outputPath, `notes-lugar-${placeId}.csv`);
  } else {
    filePath = outputPath;
  }

  await fs.writeFile(filePath, csvContent, 'utf-8');

  return filePath;
}

async exportLightCSV(sessionId: string, outputPath: string): Promise<string> {
  const notes = await prisma.note.findMany({
    where: {
      video: {
        sessionId: sessionId
      }
    },
    // 1. Mesma lógica de busca encadeada aqui
    include: {
      video: {
        select: { 
          url: true,
          session: {
            select: {
              latitude: true,
              longitude: true
            }
          }
        }
      }
    }
  });

  const csvHeader = 'quantity,dateTime,location,content,animal,videoFileName\n';

  const csvRows = notes.map(note => {
    const videoFileName = note.video?.url ?? '';
    
    // 2. Extraímos as coordenadas
    const lat = note.video?.session?.latitude ?? '--';
    const lon = note.video?.session?.longitude ?? '--';
    const location = `Lat: ${lat} | Long: ${lon}`;

    // 3. Preenchemos os 6 campos corretamente
    return [
      note.quantity,
      note.dateTime,
      location,
      note.content,
      note.animal,
      videoFileName
    ]
      .map(field => `"${String(field ?? '')}"`)
      .join(',');
  });

  const csvContent = csvHeader + csvRows.join('\n');

  const stat = await fs.stat(outputPath).catch(() => null);

  let filePath: string;

  if (stat && stat.isDirectory()) {
    filePath = path.join(outputPath, `notes-session-${sessionId}.csv`);
  } else if (!path.extname(outputPath)) {
    await fs.mkdir(outputPath, { recursive: true });
    filePath = path.join(outputPath, `notes-session-${sessionId}.csv`);
  } else {
    filePath = outputPath;
  }

  await fs.writeFile(filePath, csvContent, 'utf-8');

  return filePath;
}
}