import jwt from "jsonwebtoken";

export const generarJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_OR_PRIVATE_KEY!,
      {
        expiresIn: "1y",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se ha podido generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
