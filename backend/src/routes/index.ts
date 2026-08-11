import express from "express"
import { mainRouter } from "./mainRoute"
import { userRoute } from "./userRoute";
import { animalRoute } from "./animalRoute";
import { animalListRoute } from "./animalListRoute";
import { sessionRoute } from "./sessionRoute";
import { userAuthenticateRoute } from "./authRoute";
import { videoRoute } from "./videoRoute";
import { boxRoute } from "./boundingBoxRoute";
import { animalMemberRoute } from "./animalMemberRoute";
import { noteRoute } from "./noteRoute";
import { placeRoute } from "./placeRouter";
import { resetDataRoute } from "./resetDataRoute";

export const route = express.Router();

route.use('/', mainRouter);
route.use('/user', userRoute);
route.use('/animal', animalRoute);
route.use('/animalList', animalListRoute);
route.use('/session', sessionRoute);
route.use('/auth', userAuthenticateRoute);
route.use('/video', videoRoute);
route.use('/box', boxRoute);
route.use('/animalMember', animalMemberRoute);
route.use('/note', noteRoute);
route.use('/place', placeRoute);
route.use('/resetData', resetDataRoute)