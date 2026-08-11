import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { ExportFullyCSVService } from "../../../services/NoteService/ExportFullyCSVService";
import { AbundanciaService } from "../../../services/NoteService/AbundanciaService";

export class AbundanciaController {
    constructor(private noteRepo: INoteRepository){}
    
    async handle(req: Request, res: Response): Promise<Response>{
        // Alterado de outputPath para exportPath para bater com o JSON do Front
        const {placeId} = req.params;

        const exportFullyCSVService = new AbundanciaService(this.noteRepo);
        
        try {
            const path = await exportFullyCSVService.execute(placeId);
            return res.status(201).json(path) // Retorna um objeto para facilitar a leitura no Front
        } catch (error) {
            console.error("Erro na exportação:", error);
            return res.status(500).json({ error: "Falha ao gerar gráfico de abundancia" });
        }
    }
}