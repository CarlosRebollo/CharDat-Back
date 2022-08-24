import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    if (!process.env.DB_CONNECTION) {
      console.log("No hay cadena de conexion a la BBDD");
    } else {
      await mongoose.connect(process.env.DB_CONNECTION);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar la base de datos");
  }
};
