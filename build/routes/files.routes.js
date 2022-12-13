"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const datos_controller_1 = require("../controllers/datos.controller");
const validarJWT_1 = require("../middlewares/validarJWT");
const routerFiles = (0, express_1.default)();
routerFiles.get("/", validarJWT_1.validarJWT, datos_controller_1.getCharacters);
routerFiles.post("/", validarJWT_1.validarJWT, datos_controller_1.postCharacters);
exports.default = routerFiles;
