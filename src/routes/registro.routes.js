import Router from "express-promise-router";
import {
  createRegistro,
  getAllRegistro,
  getRegistro,
  updateRegistro,
} from "../controllers/registro.controllers.js";
import {isAuth, tipoUsuarioVet} from "../middlewares/auth.middleware.js";
import { idPet } from "../middlewares/iDs.middleware.js"

const router = Router();

router.get("/registros", isAuth, getAllRegistro);

router.get("/registro/:id", isAuth, getRegistro);

router.post("/crear_registro", isAuth, createRegistro);

router.put("/actualizar_registro/:id", isAuth, tipoUsuarioVet, updateRegistro);

export default router;
