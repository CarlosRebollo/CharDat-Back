import fs from "fs";
import path from "path";

export const crearCharactersLocalFile = (body: any, carpetaUsuario: string) => {
  return new Promise((resolve, reject) => {
    const characters = body;

    const nombreTemp = "characters.json";
    const carpetaUser = path.join(__dirname, carpetaUsuario);
    const uploadPath = path.join(carpetaUser, nombreTemp);

    // * Si no existe la carpeta del usuario, creo una nueva con su ID
    if (!fs.existsSync(carpetaUser)) {
      fs.mkdirSync(carpetaUser);
    }

    fs.writeFile(uploadPath, JSON.stringify(characters), (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve(nombreTemp);
    });
  });
};
