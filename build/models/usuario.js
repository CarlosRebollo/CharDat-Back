"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioSchema = exports.RolEnum = void 0;
const mongoose_1 = require("mongoose");
var RolEnum;
(function (RolEnum) {
    RolEnum["user"] = "User";
    RolEnum["admin"] = "Admin";
})(RolEnum = exports.RolEnum || (exports.RolEnum = {}));
exports.UsuarioSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("Usuario", exports.UsuarioSchema);
