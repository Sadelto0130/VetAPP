import Router from "express-promise-router";
import {
  createRegistro,
  getAllRegistro,
  getRegistro,
  /* getRegistrosPet, */
  updateRegistro,
  getAllRegistroPet,
  getUserRecordsPets
} from "../controllers/registro.controllers.js";
import {isAuth, tipoUsuarioVet} from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { crearRegistro, actualizarRegistro } from "../schemas/registro.schema.js";

const router = Router();

router.get("/registros", isAuth, getAllRegistro);

router.get("/registro/:id", isAuth, getRegistro);

router.get("/registros_user/:id", isAuth, getUserRecordsPets);  

router.get("/registros_mascota/:id", isAuth, getAllRegistroPet);

router.post("/crear_registro", isAuth, validateSchema(crearRegistro), createRegistro);

router.put("/actualizar_registro/:id", isAuth, tipoUsuarioVet, validateSchema(actualizarRegistro), updateRegistro);

export default router;
