import { Schema, model, Document } from "mongoose";

export enum RolEnum {
  user = "User",
  admin = "Admin",
}

export interface IUsuario extends Document {
  email: string;
  password: string;
  rol: RolEnum;
  estado: boolean;
  rutaDatos: string;
}

export const UsuarioSchema = new Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  rol: {
    type: String,
    enum: [RolEnum.admin, RolEnum.user],
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
