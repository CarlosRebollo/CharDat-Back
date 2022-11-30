import Router from "express";
import { check } from "express-validator";
import {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
  loginUsuario,
  getUsuarioPorJWT,
} from "../controllers/usuario.controller";
import { existeEmail, existeUsuarioPorId } from "../helpers/validacionesDB";
import { validarCampos } from "../middlewares/validarCamposBD";
import { validarJWT } from "../middlewares/validarJWT";
import { esAdminRole } from "../middlewares/validarRoles";

const routerUsuario = Router();

routerUsuario.get("/", [validarJWT], getUsuarioPorJWT);

routerUsuario.get("/allUsers", getUsuarios);

routerUsuario.post(
  "/",
  [
    check("password", "La contraseña debe ser más de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(existeEmail),
    validarCampos,
  ],
  postUsuario
);

routerUsuario.post(
  "/login",
  [check("email", "El correo no es valido").isEmail(), validarCampos],
  loginUsuario
);

routerUsuario.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña debe ser más de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  putUsuario
);

routerUsuario.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUsuario
);

export default routerUsuario;
