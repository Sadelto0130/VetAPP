import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createAcessToken, createRefreshToken } from "../libs/jwt.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  let client;

  try {
    client = await pool.connect();

    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Correo no registrado" });
    }

    const validPassword = await bcrypt.compare(password, result.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "La contraseña es incorrecta" });
    }

    const userData = {
      idduenio: result.rows[0].idduenio,
      nombre: result.rows[0].nombre,
      tipousuario: result.rows[0].tipousuario,
    };

    const token = await createAcessToken(userData);
    const regfreshToken = await createRefreshToken(userData);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", regfreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const user = { ...result.rows[0] };
    delete user.password;
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  } finally {
    if (client) client.release();
  }
};

export const register = async (req, res, next) => {
  let {
    nombre,
    apellido,
    email,
    password,
    tipousuario = "usuario",
    estado = "activo",
  } = req.body;

  let client;

  try {
    client = await pool.connect();

    const hashedPass = await bcrypt.hash(password, 10);
    const gravatar = `https://robohash.org/${nombre}+${apellido}?set=set4`;

    const result = await client.query(
      "INSERT INTO users(nombre, apellido, email, password, tipousuario, estado, gravatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nombre, apellido, email, hashedPass, tipousuario, estado, gravatar]
    );

    const tokenData = {
      idduenio: result.rows[0].idduenio,
      nombre: result.rows[0].nombre,
      tipousuario: result.rows[0].tipousuario,
    };

    const token = await createAcessToken(tokenData);
    const refreshToken = await createRefreshToken(tokenData);

    res.cookie("token", token, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const user = { ...result.rows[0] };
    delete user.password;
    return res.json(user);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }
    next(error);
  } finally {
    if (client) client.release();
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ message: "Sesión cerrada correctamente" });
};

export const profile = async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE idduenio = $1", [
    req.userId,
  ]);
  return res.json(result.rows[0]);
};

export const updateProfile = async (req, res, next) => {
  const { nombre, apellido, email, password } = req.body;
  let client;

  try {
    client = await pool.connect();

    const datosOriginales = await client.query(
      "SELECT * FROM users WHERE idduenio = $1",
      [req.userId]
    );

    if (datosOriginales.rowCount === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    const usuario = datosOriginales.rows[0];

    const updateUsers = {
      nombre: nombre ?? usuario.nombre,
      apellido: apellido ?? usuario.apellido,
      email: email ?? usuario.email,
      password: password
        ? await bcrypt.hash(password, 10)
        : usuario.password,
    };

    const result = await client.query(
      "UPDATE users SET nombre = $1, apellido = $2, email = $3, password = $4 WHERE idduenio = $5 RETURNING *",
      [
        updateUsers.nombre,
        updateUsers.apellido,
        updateUsers.email,
        updateUsers.password,
        req.userId,
      ]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  } finally {
    if (client) client.release();
  }
};

export const me = async (req, res) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query("SELECT * FROM users WHERE idduenio = $1", [
      req.userId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = { ...result.rows[0] };
    delete user.password;
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener usuario" });
  } finally {
    if (client) client.release();
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      message: "No hay refresh token",
    });
  }

  jwt.verify(token, "xyz123", (err, user) => {
    if (err)
      return res.status(403).json({ message: "Refresh token no valido" });

    const newAccessToken = createAcessToken({
      idduenio: user.idduenio,
      nombre: user.nombre,
      tipousuario: user.tipousuario,
    });

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 115 * 60 * 1000, // 1 day
    });

    return res.json({ message: "Token actualizado" });
  });
};
