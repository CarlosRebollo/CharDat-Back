import { Request, Response } from "express";
import Usuario from "../models/usuario";
import bcryptjs from "bcryptjs";

export const getUsuarios = async (_req: Request, res: Response) => {
  const usuarios = await Usuario.find();
  return res.json({ usuarios });
};

export const getUsuario = async (_req: Request, _res: Response) => {
  //TODO
};

export const postUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  try {
    const usuario = new Usuario({ nombre, email, password });

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    return res.status(201).json({
      msg: "Usuario creado",
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Hable con el admin" });
  }
};

export const putUsuario = async (_req: Request, _res: Response) => {
  //TODO
};

export const deleteUsuario = async (_req: Request, _res: Response) => {
  //TODO
};
