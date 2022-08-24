"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../controllers/usuario.controller");
const routerUsuario = (0, express_1.default)();
routerUsuario.get("/", usuario_controller_1.getUsuarios);
routerUsuario.get("/:id");
routerUsuario.post("/", usuario_controller_1.postUsuario);
routerUsuario.put("/:id");
routerUsuario.delete("/:id");
exports.default = routerUsuario;
// localhost/api/usuarios
