import { Request, Response } from "express";
import Usuario, { RolEnum } from "../models/usuario";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generarJWT";

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
  const { nombre, email, password, rol } = req.body;
  try {
    const usuario = new Usuario({ nombre, email });

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    usuario.rol = rol ? rol : RolEnum.user;

    await usuario.save();

    await Usuario.findByIdAndUpdate(usuario.id, {
      rutaDatos: "../../data/" + usuario.id,
    });

    return res.status(201).json({
      msg: "Usuario creado",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Póngase en contacto con el administrador" });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "La dirección de correo no está registrada",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Datos incorrectos",
      });
    }

    const verifyPass = bcryptjs.compareSync(password, usuario.password);
    if (!verifyPass) {
      return res.status(400).json({
        msg: "Email y/o contraseña incorrectos",
      });
    }

    const jwt = await generarJWT(usuario.id);
    return res.json({ jwt });
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
