import { Request, Response } from "express";
import Usuario from "../models/usuario";
import bcryptjs from "bcryptjs";

export const getUsuarios = async (_req: Request, res: Response) => {
  const usuarios = await Usuario.find();
  return res.json({ usuarios });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioPorId = await Usuario.findById(id);
  return res.json({ usuarioPorId });
};

export const postUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  try {
    const usuario = new Usuario({ nombre, email });

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    return res.status(201).json({
      msg: "Usuario creado",
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Póngase en contacto con el administrador" });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, password } = req.body;
  try {
    const salt = bcryptjs.genSaltSync(10);
    const passwordHash = bcryptjs.hashSync(password, salt);
    console.log(password, passwordHash);

    await Usuario.findByIdAndUpdate(id, {
      nombre,
      password: passwordHash,
    });
    return res.json({ msg: "Usuario actualizado" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Póngase en contacto con el administrador" });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Usuario.findByIdAndUpdate(id, { estado: false });
    return res.json({ msg: "Usuario eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Póngase en contacto con el administrador" });
  }
};
