import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createAcessToken } from "../libs/jwt.js";

export const signin = async (req, res) => {
  const { matricula, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM veterinario WHERE matricula = $1", [
      matricula,
    ]);

    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "Matricula no registrada",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "La contraseña es incorrecta",
      });
    }

    const token = await createAcessToken({
      id: result.rows[0].id,
      nombre: result.rows[0].nombre,
      tipousuario: result.rows[0].tipousuario,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSit: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // devuelve el usuario sin la contraseña
    const user = { ...result.rows[0] };
    delete user.password;
    return res.json(user);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        message: "El correo ya esta en uso",
      });
    }
  }
};

export const getVet = async (req, res) => {
  const id = req.userId
  const result = await pool.query("SELECT * FROM veterinaria WHERE id = $1", [id])

  if(result.rowCount === 0) {
    return res.status(400).json({message: "Veterinario no existe"})
  }

  // Guardar el id en la sesión (reemplazará el anterior si existe)
  req.session.idUsers = id;

  return res.json({ 
    message: "Veterinarios encontrado", 
    registro: result.rows
  });
  next(error);
};

export const updateVet = async (req, res) => { 
  const id = req.params.id
  const {email, password, foto} = req.body

  const datosOriginales = await pool.query(
    "SELECT * FROM registro WHERE idregistro = $1",
    [id]
  );

  if (datosOriginales.rowCount === 0) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  const updateRegistro = {
    nombre: nombre ?? datosOriginales.rows[0].nombre,
    apellido: apellido ?? datosOriginales.rows[0].apellido,
    email: email ?? datosOriginales.rows[0].email,
    password: password ?? datosOriginales.rows[0].password,
    matricula: matricula ?? datosOriginales.rows[0].matricula,
    foto: foto ?? datosOriginales.rows[0].foto,
    idVeterinaria: idVeterinaria ?? datosOriginales.rows[0].idVeterinaria
  };


  const result = await pool.query("UPDATE veterinario SET(email = $1, pass = $2, foto = $3 WHERE id = $4", [updateRegistro.email, updateRegistro.password, updateRegistro.foto])
  res.send('Veterinario Actualizado')
  next(error);
};
