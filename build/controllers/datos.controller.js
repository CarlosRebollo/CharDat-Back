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
exports.postCharacters = exports.getCharacters = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const generarFicheroDePersonajes_1 = require("../helpers/generarFicheroDePersonajes");
const getCharacters = (req, res) => {
    try {
        if (req.usuario.rutaDatos) {
            const pathFile = path_1.default.join(__dirname, req.usuario.rutaDatos, "characters.json");
            if (fs_1.default.existsSync(pathFile)) {
                const charactersString = fs_1.default.readFileSync(pathFile, "utf8");
                const characters = JSON.parse(charactersString);
                return res.json(characters);
            }
            else {
                return res.status(404).json({
                    msg: "No existen datos en el servidor",
                });
            }
        }
        return res
            .status(500)
            .json({ msg: "Póngase en contacto con el administrador" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Póngase en contacto con el administrador" });
    }
};
exports.getCharacters = getCharacters;
const postCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nombre = yield (0, generarFicheroDePersonajes_1.crearCharactersLocalFile)(req.body, req.usuario.rutaDatos);
        return res.json({ msg: "Datos subidos con éxito", nombre });
    }
    catch (error) {
        return res.status(400).json({ msg: error });
    }
});
exports.postCharacters = postCharacters;
