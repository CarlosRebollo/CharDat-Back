"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esAdminRole = void 0;
const usuario_1 = require("../models/usuario");
const esAdminRole = (request, response, next) => {
    if (!request.usuario) {
        return response.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero",
        });
    }
    const { rol } = request.usuario;
    if (rol !== usuario_1.RolEnum.admin) {
        return response.status(401).json({
            msg: `Su usuario no es administrador - No tiene permisos para realizar esta acción`,
        });
    }
    return next();
};
exports.esAdminRole = esAdminRole;
