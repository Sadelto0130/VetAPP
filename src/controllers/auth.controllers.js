import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createAcessToken } from "../libs/jwt.js";
import md5 from "md5";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "Correo no registrado",
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
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

export const register = async (req, res, next) => {
  const { nombre, apellido, email, password, tipousuario, estado } = req.body;

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const gravatar = `https://robohash.org/${nombre}+${apellido}?set=set4`

    if(!tipousuario || !estado) {
      tipousuario = "usuario";
      estado = "activo";
    }

    const result = await pool.query(
      "INSERT INTO users(nombre, apellido, email, password, tipousuario, estado, gravatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nombre, apellido, email, hashedPass, tipousuario, estado, gravatar]
    );

    const token = await createAcessToken({
      id: result.rows[0].id,
      nombre: result.rows[0].nombre,
      tipousuario: result.rows[0].tipousuario,
    });

    // Se crea la cookie con el token
    res.cookie("token", token, {
      sameSite: "none",
      // httpOnly: true,
      secure: true,
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
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

export const profile = async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE idduenio = $1", [
    req.userId,
  ]);
  return res.json(result.rows[0]);
};

export const updateProfile = async (req, res, next) => {
  const { nombre, apellido, email, password } = req.boy;

  try {
    const datosOriginales = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [req.userId]
    );

    if (datosOriginales.rowCount === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    const updateUsers = {
      nombre: nombre ?? datosOriginales.rows[0].nombre,
      apellido: apellido ?? datosOriginales.rows[0].apellido,
      email: email ?? datosOriginales.rows[0].email,
      password: password ?? datosOriginales.rows[0].password,
    };

    const result = await pool.query(
      "UPDATE users SET nombre = $1, apellido = $2, email = $3, password = $4 WHERE id = $5 RETURNING *",
      [
        datosOriginales.nombre,
        datosOriginales.apellido,
        datosOriginales.email,
        datosOriginales.password,
        res.userId,
      ]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
