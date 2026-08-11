import { Request, Response, Router } from "express";
import { NoteRepository } from "../repositories/NoteRepository";
import { CreateNoteController } from "./controllers/note/CreateNoteController";
import { ExportFullyCSVController } from "./controllers/note/ExportFullyCSVController";
import { ExportLightCSVController } from "./controllers/note/ExportLightCSVController";
import { GetNoteController } from "./controllers/note/GetNoteController";
import { ListBySessionNoteController } from "./controllers/note/ListBySessionNoteController";
import { ListByVideoNoteController } from "./controllers/note/ListByVideoNoteController";
import { ListNoteController } from "./controllers/note/ListNoteController";
import { UpdateNoteController } from "./controllers/note/UpdateNoteController";
import { resolveController } from "../adapters/resolverController";
import { AbundanciaController } from "./controllers/note/AbundanciaController";
import { FrequenciaController } from "./controllers/note/FrequenciaController";
import { RelogioBiologicoController } from "./controllers/note/RelogioController";
import { TendenciaController } from "./controllers/note/TendenciaController";

export const noteRoute = Router();

const noteRepo = new NoteRepository();
const createNoteController = new CreateNoteController(noteRepo)
const exportFullyCSVController = new ExportFullyCSVController(noteRepo)
const exportLightCSVController = new ExportLightCSVController(noteRepo)
const getNoteController = new GetNoteController(noteRepo)
const listBySessionNoteController = new ListBySessionNoteController(noteRepo)
const listByVideoNoteController = new ListByVideoNoteController(noteRepo)
const listNoteController = new ListNoteController(noteRepo)
const updateNoteController = new UpdateNoteController(noteRepo)
const abundanciaController = new AbundanciaController(noteRepo)
const frequenciaController = new FrequenciaController(noteRepo)
const relogioController = new RelogioBiologicoController(noteRepo)
const tendenciaController = new TendenciaController(noteRepo)

noteRoute.post('/abundancia/:placeId', resolveController(async (req: Request, res: Response) => {
    return await abundanciaController.handle(req, res)
}))

noteRoute.post('/frequencia/:placeId', resolveController(async (req: Request, res: Response) => {
    return await frequenciaController.handle(req, res)
}))

noteRoute.post('/relogio/:placeId', resolveController(async (req: Request, res: Response) => {
    return await relogioController.handle(req, res)
}))

noteRoute.post('/tendencia/:placeId', resolveController(async (req: Request, res: Response) => {
    return await tendenciaController.handle(req, res)
}))

noteRoute.post('/', resolveController(async (req: Request, res: Response) => {
    return await createNoteController.handle(req, res)
}))

noteRoute.post('/Fullycsv/:placeId', resolveController(async (req: Request, res: Response) => {
    return await exportFullyCSVController.handle(req, res)
}))

noteRoute.post('/csv/:sessionId', resolveController(async (req: Request, res: Response) => {
    return await exportLightCSVController.handle(req, res)
}))

noteRoute.get('/:id', resolveController(async (req: Request, res: Response) => {
    return await getNoteController.handle(req, res)
}))

noteRoute.get('/session/:sessionId', resolveController(async (req: Request, res: Response) => {
    return await listBySessionNoteController.handle(req, res)
}))

noteRoute.get('/video/:videoId', resolveController(async (req: Request, res: Response) => {
    return await listByVideoNoteController.handle(req, res)
}))

noteRoute.get('/', resolveController(async (req: Request, res: Response) => {
    return await listNoteController.handle(req, res)
}))

noteRoute.put('/:id', resolveController(async (req: Request, res: Response) => {
    return await updateNoteController.handle(req, res)
}))


