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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsuarios = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.find();
    return res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password } = req.body;
    try {
        const usuario = new usuario_1.default({ nombre, email, password });
        const salt = bcryptjs_1.default.genSaltSync(10);
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        yield usuario.save();
        return res.status(201).json({
            msg: "Usuario creado",
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hable con el admin" });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO
});
exports.putUsuario = putUsuario;
const deleteUsuario = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO
});
exports.deleteUsuario = deleteUsuario;
