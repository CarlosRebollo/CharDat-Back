import { Schema, model, Document } from "mongoose";

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  estado: boolean;
  rutaDatos: string;
}

export const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  rutaDatos: {
    type: String,
    default: "",
  },
});

export default model<IUsuario>("Usuario", UsuarioSchema);
