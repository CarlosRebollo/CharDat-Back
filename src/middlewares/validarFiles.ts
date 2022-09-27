import { Request, Response, NextFunction } from "express";
export const validarFicheroSubir = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (
    !request.files ||
    Object.keys(request.files).length === 0 ||
    !request.files.fichero
  ) {
    return response.status(400).json({ msg: "No hay ficheros que subir" });
  }

  return next();
};
