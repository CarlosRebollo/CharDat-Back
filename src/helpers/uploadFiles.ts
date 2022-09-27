import fs from "fs";
import path from "path";

export const subirFichero = (
  files: any,
  carpetaUsuario: string,
  extValidas = ["json"]
) => {
  return new Promise((resolve, reject) => {
    const { fichero } = files;
    const nombreCortado = fichero.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar extensiones
    if (!extValidas.includes(extension.toLowerCase())) {
      return reject(
        `La extensión: ${extension} no está permitida. La extension/es permitida es/son [${extValidas}]`
      );
    }

    const nombreTemp = "characters" + "." + extension;
    const carpetaUser = path.join(__dirname, carpetaUsuario);
    const uploadPath = path.join(carpetaUser, nombreTemp);

    // * Si no existe la carpeta del usuario, creo una nueva con su ID
    if (!fs.existsSync(carpetaUser)) {
      fs.mkdirSync(carpetaUser);
    }

    fichero.mv(uploadPath, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve(nombreTemp);
    });
  });
};
