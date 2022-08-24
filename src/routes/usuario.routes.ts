import Router from "express";
import { check } from "express-validator";
import {
  getUsuarios,
  postUsuario,
  getUsuario,
  putUsuario,
  deleteUsuario,
} from "../controllers/usuario.controller";
import { existeEmail, existeUsuarioPorId } from "../helpers/validacionesDB";
import { validarCampos } from "../middlewares/validarCamposBD";

const routerUsuario = Router();

routerUsuario.get("/", getUsuarios);
routerUsuario.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  getUsuario
);
routerUsuario.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña debe ser más de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(existeEmail),
    validarCampos,
  ],
  postUsuario
);
routerUsuario.put(
  "/:id",
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  check("nombre", "El nombre es obligatorio").notEmpty(),
  check("password", "La contraseña debe ser más de 6 caracteres").isLength({
    min: 6,
  }),
  validarCampos,
  putUsuario
);
routerUsuario.delete(
  "/:id",
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  validarCampos,
  deleteUsuario
);

export default routerUsuario;

// localhost/api/usuarios
