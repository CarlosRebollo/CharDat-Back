import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import { crearCharactersLocalFile } from "../helpers/uploadFiles";
import { IUsuario } from "../models/usuario";

declare module "express-serve-static-core" {
  export interface Request {
    usuario: IUsuario;
  }
}

export const getCharacters = (req: Request, res: Response) => {
  try {
    if (req.usuario.rutaDatos) {
      const pathFile = path.join(
        __dirname,
        req.usuario.rutaDatos,
        "characters.json"
      );
      if (fs.existsSync(pathFile)) {
        const charactersString = fs.readFileSync(pathFile, "utf8");
        const characters = JSON.parse(charactersString);
        return res.json(characters);
      } else {
        return res.status(404).json({
          msg: "No existen datos en el servidor",
        });
      }
    }
    return res
      .status(500)
      .json({ msg: "Póngase en contacto con el administrador" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Póngase en contacto con el administrador" });
  }
};

export const postCharacters = async (req: Request, res: Response) => {
  try {
    const nombre = await crearCharactersLocalFile(
      req.body,
      req.usuario.rutaDatos
    );
    return res.json({ msg: "Datos subidos con éxito", nombre });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};
