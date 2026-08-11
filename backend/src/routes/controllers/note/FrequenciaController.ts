import { Request, Response } from "express";
import { INoteRepository } from "../../../interfaces.ts/INoteRepository";
import { ExportFullyCSVService } from "../../../services/NoteService/ExportFullyCSVService";
import { AbundanciaService } from "../../../services/NoteService/AbundanciaService";
import { RelogioBiologicoService } from "../../../services/NoteService/RelogioBiologicoService";
import { FrequenciaService } from "../../../services/NoteService/FrequenciaService";

export class FrequenciaController {
    constructor(private noteRepo: INoteRepository){}
    
    async handle(req: Request, res: Response): Promise<Response>{
        // Alterado de outputPath para exportPath para bater com o JSON do Front
        const {placeId} = req.params;
        const { sessionIds } = req.body;

        const exportFullyCSVService = new FrequenciaService(this.noteRepo);
        
        try {
            const path = await exportFullyCSVService.execute(placeId, sessionIds);
            return res.status(201).json(path) // Retorna um objeto para facilitar a leitura no Front
        } catch (error) {
            console.error("Erro na exportação:", error);
            return res.status(500).json({ error: "Falha ao gerar grafico de frequencia" });
        }
    }
}