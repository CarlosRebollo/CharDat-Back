import Usuario from "../models/usuario";

export const existeEmail = async (email: string) => {
  const existeCorreo = await Usuario.findOne({ email });
  if (existeCorreo) throw new Error(`Esa dirección de correo ya está en uso`);
};

export const existeUsuarioPorId = async (id: string) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) throw new Error(`Ese id no existe`);
};
