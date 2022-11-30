import Router from "express";
import { getCharacters, postCharacters } from "../controllers/datos.controller";
import { validarJWT } from "../middlewares/validarJWT";

const routerFiles = Router();

routerFiles.get("/", validarJWT, getCharacters);

routerFiles.post("/", validarJWT, postCharacters);

export default routerFiles;
