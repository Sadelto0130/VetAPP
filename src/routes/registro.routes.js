import Router from "express-promise-router";
import {
  createRegistro,
  getAllRegistro,
  getRegistro,
  updateRegistro,
} from "../controllers/registro.controllers.js";
import {isAuth, tipoUsuario} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/registro", isAuth, getAllRegistro);

router.get("/registro/:id", isAuth, getRegistro);

router.post("/crear_registro", isAuth, createRegistro);

router.put("/actualizar_registro/:id", isAuth, tipoUsuario, updateRegistro);

export default router;
