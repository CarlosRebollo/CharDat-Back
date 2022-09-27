import Router from "express";
import {
  getCharacters,
  postCharacters,
  updateCharacters,
} from "../controllers/files.controller";
import { validarFicheroSubir } from "../middlewares/validarFiles";
import { validarJWT } from "../middlewares/validarJWT";

const routerFiles = Router();

routerFiles.get("/", validarJWT, getCharacters);

routerFiles.post("/", [validarJWT, validarFicheroSubir], postCharacters);

routerFiles.put("/", [validarJWT, validarFicheroSubir], updateCharacters);

export default routerFiles;
