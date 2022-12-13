"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearCharactersLocalFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crearCharactersLocalFile = (body, carpetaUsuario) => {
    return new Promise((resolve, reject) => {
        const characters = body;
        const nombreTemp = "characters.json";
        const carpetaUser = path_1.default.join(__dirname, carpetaUsuario);
        const uploadPath = path_1.default.join(carpetaUser, nombreTemp);
        // * Si no existe la carpeta del usuario, creo una nueva con su ID
        if (!fs_1.default.existsSync(carpetaUser)) {
            fs_1.default.mkdirSync(carpetaUser);
        }
        fs_1.default.writeFile(uploadPath, JSON.stringify(characters), (err) => {
            if (err) {
                return reject(err);
            }
            resolve(nombreTemp);
        });
    });
};
exports.crearCharactersLocalFile = crearCharactersLocalFile;
