"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUsuario = exports.putUsuario = exports.loginUsuario = exports.postUsuario = exports.getUsuarioPorJWT = exports.getUsuarios = void 0;
const usuario_1 = __importStar(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generarJWT_1 = require("../helpers/generarJWT");
const getUsuarios = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.find();
    return res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuarioPorJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usuario_1.default.findOne({ email: req.usuario.email });
    const id = user === null || user === void 0 ? void 0 : user._id;
    const correo = user === null || user === void 0 ? void 0 : user.email;
    return res.json({ id, correo });
});
exports.getUsuarioPorJWT = getUsuarioPorJWT;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, rol } = req.body;
    try {
        const usuario = new usuario_1.default({ email });
        const salt = bcryptjs_1.default.genSaltSync(10);
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        usuario.rol = rol ? rol : usuario_1.RolEnum.user;
        yield usuario.save();
        yield usuario_1.default.findByIdAndUpdate(usuario.id, {
            rutaDatos: "../../data/" + usuario.id,
        });
        return res.status(201).json({
            msg: "Usuario creado",
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Póngase en contacto con el administrador" });
    }
});
exports.postUsuario = postUsuario;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: "La dirección de correo no está registrada",
            });
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Datos incorrectos",
            });
        }
        const verifyPass = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!verifyPass) {
            return res.status(400).json({
                msg: "Email y/o contraseña incorrectos",
            });
        }
        const jwt = yield (0, generarJWT_1.generarJWT)(usuario.id);
        return res.json({ jwt });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Póngase en contacto con el administrador" });
    }
});
exports.loginUsuario = loginUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, password } = req.body;
    try {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const passwordHash = bcryptjs_1.default.hashSync(password, salt);
        console.log(password, passwordHash);
        yield usuario_1.default.findByIdAndUpdate(id, {
            nombre,
            password: passwordHash,
        });
        return res.json({ msg: "Usuario actualizado" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ msg: "Póngase en contacto con el administrador" });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield usuario_1.default.findByIdAndUpdate(id, { estado: false });
        return res.json({ msg: "Usuario eliminado" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ msg: "Póngase en contacto con el administrador" });
    }
});
exports.deleteUsuario = deleteUsuario;
