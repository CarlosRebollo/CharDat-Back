import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import { subirFichero } from "../helpers/uploadFiles";
import { IUsuario } from "../models/usuario";

declare module "express-serve-static-core" {
  export interface Request {
    usuario: IUsuario;
  }
}

export const getCharacters = async (req: Request, res: Response) => {
  try {
    if (req.usuario.rutaDatos) {
      const pathFile = path.join(
        __dirname,
        req.usuario.rutaDatos,
        "characters.json"
      );

      if (fs.existsSync(pathFile)) {
        return res.sendFile(pathFile);
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
    // * Para subir imagenes en un futuro pasar como parametro una array con las extensiones validas
    //const extValidasImg = [ "png", "jpg", "jpeg", "gif"];
    //const nombre = await subirFichero(req.files, req.usuario.id, extValidasImg);
    const nombre = await subirFichero(req.files, req.usuario.rutaDatos);
    return res.json({ msg: "Datos subidos con éxito", nombre });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

export const updateCharacters = async (req: Request, res: Response) => {
  try {
    if (req.usuario.rutaDatos) {
      const pathFile = path.join(
        __dirname,
        req.usuario.rutaDatos,
        "characters.json"
      );

      if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
      }
      const nombre = await subirFichero(req.files, req.usuario.rutaDatos);
      return res.json({ msg: "Datos actualizados con éxito", nombre });
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
