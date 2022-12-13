"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const usuario_controller_1 = require("../controllers/usuario.controller");
const validacionesDB_1 = require("../helpers/validacionesDB");
const validarCamposBD_1 = require("../middlewares/validarCamposBD");
const validarJWT_1 = require("../middlewares/validarJWT");
const validarRoles_1 = require("../middlewares/validarRoles");
const routerUsuario = (0, express_1.default)();
routerUsuario.get("/", [validarJWT_1.validarJWT], usuario_controller_1.getUsuarioPorJWT);
routerUsuario.get("/allUsers", usuario_controller_1.getUsuarios);
routerUsuario.post("/", [
    (0, express_validator_1.check)("password", "La contraseña debe tener más de 6 caracteres").isLength({
        min: 6,
    }),
    (0, express_validator_1.check)("email", "El correo no es válido").isEmail(),
    (0, express_validator_1.check)("email").custom(validacionesDB_1.existeEmail),
    validarCamposBD_1.validarCampos,
], usuario_controller_1.postUsuario);
routerUsuario.post("/login", [(0, express_validator_1.check)("email", "El correo no es válido").isEmail(), validarCamposBD_1.validarCampos], usuario_controller_1.loginUsuario);
routerUsuario.put("/:id", [
    (0, express_validator_1.check)("id", "No es un ID válido").isMongoId(),
    (0, express_validator_1.check)("id").custom(validacionesDB_1.existeUsuarioPorId),
    (0, express_validator_1.check)("password", "La contraseña debe tener más de 6 caracteres").isLength({
        min: 6,
    }),
    validarCamposBD_1.validarCampos,
], usuario_controller_1.putUsuario);
routerUsuario.delete("/:id", [
    validarJWT_1.validarJWT,
    validarRoles_1.esAdminRole,
    (0, express_validator_1.check)("id", "No es un ID válido").isMongoId(),
    (0, express_validator_1.check)("id").custom(validacionesDB_1.existeUsuarioPorId),
    validarCamposBD_1.validarCampos,
], usuario_controller_1.deleteUsuario);
exports.default = routerUsuario;
