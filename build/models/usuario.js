"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UsuarioSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("Usuario", exports.UsuarioSchema);
