"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn: "1y",
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se ha podido generar el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
