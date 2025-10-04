    import { PrismaClient } from "@prisma/client";
    import { INoteRepository } from "../interfaces.ts/INoteRepository";
    import { INote } from "../interfaces.ts/INoteInterface";
    import { promises as fs } from 'fs';
    import path from 'path';
import { AppError } from "../errors/AppError";

    const prisma = new PrismaClient();
    export class NoteRepository implements INoteRepository{
        constructor(){}
        async get(id: string): Promise<INote> {
            const result = await prisma.note.findUnique({
                where: {id}
            })

            if(!result) throw new AppError("note not found")

            return result
        }

        async getByBox(boundingBoxId: string): Promise<INote> {
            const result = await prisma.note.findUnique({
                where: {boundingBoxId}
            })

            if(!result) throw new AppError("note not found")

            return result
        }

        async listByvideo(videoId: string): Promise<INote[]> {
            const notes = await prisma.note.findMany({
                where: {
                boundingBox: {
                    videoId: videoId
                }
                },
                include: {
                boundingBox: {
                    include: {
                    video: true
                    }
                },
                user: true 
                }
    });
        return notes;
    }
        
    async findAll(): Promise<INote[]> {
            const result = await prisma.note.findMany()
            return result
        }

        
    async create(props: INote): Promise<INote> {
            const result = await prisma.note.create({
                data: props
            })

            return result
        }

    async update(id: string, props: INote): Promise<INote> {
            const result = await prisma.note.update({
                where: {id},
                data: props
            })
            return result
        }

       
    async listBySession(sessionId: string): Promise<INote[]> {
        const notes = await prisma.note.findMany({
            where: {
            boundingBox: {
                video: {
                sessionId: sessionId
                }
            }
            },
            include: {
            boundingBox: {
                include: {
                video: true
                }
            },
            user: true 
            }
        });

        return notes;
        }

    async exportFullyCSV(): Promise<string> {
        const notes = await prisma.note.findMany({
            include: {
            boundingBox: {
                include: {
                video: true
                }
            }
            }
        });

        const csvHeader = 'quantity,dateTime,location,content,animal,videoFileName\n';

        const csvRows = notes.map(note => {
            const videoFileName = note.boundingBox?.video?.url ?? '';
            return [
            note.quantity,
            note.dateTime,
            note.location,
            note.content,
            note.animal,
            videoFileName
            ].map(field => `"${field}"`).join(',');
        });

        const csvContent = csvHeader + csvRows.join('\n');

        const exportDir = path.resolve(__dirname, 'exports');
        await fs.mkdir(exportDir, { recursive: true });

        const filePath = path.join(exportDir, 'notes.csv');
        await fs.writeFile(filePath, csvContent, 'utf-8');

        return filePath;
        }


     async  exportLightCSV(sessionId: string): Promise<string> {
        const notes = await prisma.note.findMany({
            where: {
            boundingBox: {
                video: {
                sessionId: sessionId
                }
            }
            },
            include: {
            boundingBox: {
                include: {
                video: true
                }
            }
            }
        });

    const csvHeader = 'quantity,dateTime,location,content,animal,videoFileName\n';

    const csvRows = notes.map(note => {
        const videoFileName = note.boundingBox?.video?.url ?? ''; 
        return [
        note.quantity,
        note.dateTime,
        note.location,
        note.content,
        note.animal,
        videoFileName
        ].map(field => `"${field}"`).join(',');
    });

        const csvContent = csvHeader + csvRows.join('\n');

        const exportDir = path.resolve(__dirname, 'exports');
        await fs.mkdir(exportDir, { recursive: true });

        const filePath = path.join(exportDir, `notes-session-${sessionId}.csv`);
        await fs.writeFile(filePath, csvContent, 'utf-8');

        return filePath;
        }
                
}