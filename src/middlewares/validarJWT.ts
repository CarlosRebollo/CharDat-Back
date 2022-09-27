import jwt from "jsonwebtoken";
import Usuario, { IUsuario } from "../models/usuario";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  export interface Request {
    usuario: IUsuario;
  }
}

export const validarJWT = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.header("x-token");

  if (!token) {
    return response.status(401).json({
      msg: "No TOKEN",
    });
  }

  try {
    const { uid } = jwt.verify(
      token,
      process.env.SECRET_OR_PRIVATE_KEY!
    ) as any;

    // Leer el usuario que corresponde al uid
    // * Pasar informacion hacia el controlador o al siguiente middleware
    // * y acceder a traves de la request
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return response.status(401).json({
        msg: "Error TOKEN no valido - Usuario undefined",
      });
    }

    // Verificar si el uid tiene estado true
    if (!usuario.estado) {
      return response.status(401).json({
        msg: "Error TOKEN no valido - Estado : false",
      });
    }

    // * Guardar el usuario en la request
    // * para poder utilizarlo en el controlador o los siguientes middlewares
    request.usuario = usuario;
  } catch (error) {
    console.log(error);
    return response.status(401).json({
      msg: "Error TOKEN no válido",
    });
  }

  return next();
};
