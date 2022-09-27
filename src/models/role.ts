import { Schema, model, Document } from "mongoose";

export interface IRol extends Document {
  rol: string;
}

export const RoleSchema = new Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

export default model<IRol>("Usuario", RoleSchema);
