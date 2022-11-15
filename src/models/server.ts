import express, { Application } from "express";
import cors from "cors";
import routerUsuario from "../routes/usuario.routes";
import routerFiles from "../routes/files.routes";
import { dbConnection } from "../database/config";

export class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
    ficheros: "/api/files",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    await dbConnection();
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // Lectura y parse body JSON
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, routerUsuario);
    this.app.use(this.apiPaths.ficheros, routerFiles);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
