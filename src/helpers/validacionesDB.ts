import Usuario from "../models/usuario";

export const existeEmail = async (email: string) => {
  const existeCorreo = await Usuario.findOne({ email });
  if (existeCorreo) throw new Error(`El correo ya esta en uso`);
};

export const existeUsuarioPorId = async (id: string) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) throw new Error(`El id no existe`);
};
