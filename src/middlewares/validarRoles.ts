import { Request, Response, NextFunction } from "express";
import { IUsuario, RolEnum } from "../models/usuario";

//* Con estas lineas de código añadimos propiedades personalizadas a la REQUEST
declare module "express-serve-static-core" {
  export interface Request {
    usuario: IUsuario;
  }
}

export const esAdminRole = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.usuario) {
    return response.status(500).json({
      msg: " Se quiere verificar el role sin validar el token primero ",
    });
  }
  const { rol } = request.usuario;

  if (rol !== RolEnum.admin) {
    return response.status(401).json({
      msg: `Su usuario no es administrador - No tiene permisos para realizar esta acción`,
    });
  }

  return next();
};
