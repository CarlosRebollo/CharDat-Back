"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validarJWT = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.header("x-token");
    if (!token) {
        return response.status(401).json({
            msg: "No TOKEN",
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        // Leer el usuario que corresponde al uid
        // * Pasar informacion hacia el controlador o al siguiente middleware
        // * y acceder a traves de la request
        const usuario = yield usuario_1.default.findById(uid);
        if (!usuario) {
            return response.status(401).json({
                msg: "Error: token no válido - Usuario undefined",
            });
        }
        // Verificar si el uid tiene estado true
        if (!usuario.estado) {
            return response.status(401).json({
                msg: "Error token no válido - Estado : false",
            });
        }
        // * Guardar el usuario en la request
        // * para poder utilizarlo en el controlador o los siguientes middlewares
        request.usuario = usuario;
    }
    catch (error) {
        console.log(error);
        return response.status(401).json({
            msg: "Error: token no válido",
        });
    }
    return next();
});
exports.validarJWT = validarJWT;
