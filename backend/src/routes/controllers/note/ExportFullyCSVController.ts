import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { ExportFullyCSVService } from "../../../services/NoteService/ExportFullyCSVService";

export class ExportFullyCSVController {
    constructor(private noteRepo: INoteRepository){}
    
    async handle(req: Request, res: Response): Promise<Response>{
        // Alterado de outputPath para exportPath para bater com o JSON do Front
        const {placeId} = req.params;
        const { exportPath } = req.body; 

        if (!exportPath) {
            return res.status(400).json({ error: "O caminho de exportação não foi fornecido." });
        }

        const exportFullyCSVService = new ExportFullyCSVService(this.noteRepo);
        
        try {
            const path = await exportFullyCSVService.execute(placeId,exportPath);
            return res.json({ path }); // Retorna um objeto para facilitar a leitura no Front
        } catch (error) {
            console.error("Erro na exportação:", error);
            return res.status(500).json({ error: "Falha ao gerar CSV" });
        }
    }
}