import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createAcessToken } from "../libs/jwt.js";
import upload from "../libs/multer.js";
import cloudinary from "../libs/cloudinary.js";
import { obtenerPublicId } from "../libs/publicID.js";

export const createClinic = async (req, res, next) => {
  const { nombre, direccion, cuil, password, telefono, email, tipousuario } =
    req.body;

  try {
    const hashedPass = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO veterinaria(nombre, direccion, cuil, password, telefono, email, tipousuario) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nombre, direccion, cuil, hashedPass, telefono, email, tipousuario]
    );

    const token = await createAcessToken({
      id: result.rows[0].idveterinaria,
      nombre: result.rows[0].nombre,
      tipousuario: result.rows[0].tipousuario,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const clinic = { ...result.rows[0] };
    delete clinic.password;

    return res.json(clinic);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        message: "Ya existe la clinica",
      });
    }
    next(error);
  }
};

export const signinClinic = async (req, res, error) => {
  const { cuil, password } = req.body;

  const result = await pool.query("SELECT * FROM veterinaria WHERE cuil = $1", [
    cuil,
  ]);

  if (result.rowCount === 0) {
    return res.status(400).json({
      message: "CUIL no registrado",
    });
  }

  const validPassword = await bcrypt.compare(password, result.rows[0].password);

  if (!validPassword) {
    res.status(400).json({
      message: "Contraseña incorrecta",
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

  return res.json(result.rows[0]);
};

export const updateClinic = async (req, res) => {
  const id = req.idUsers;
  const { nombre, direccion, cuil, password, telefono, email } = req.body;

  const datosOriginales = await pool.query(
    "SELECT * FROM veterinaria WHERE id = $1",
    [id]
  );

  if (datosOriginales.rowCount === 0) {
    return res.status(404).json({ message: "Veterinaria no encontrada" });
  }

  const updateClinica = {
    nombre: nombre ?? datosOriginales.rows[0].nombre,
    direccion: direccion ?? datosOriginales.rows[0].direccion,
    cuil: cuil ?? datosOriginales.rows[0].cuil,
    password: password ?? datosOriginales.rows[0].password,
    telefono: telefono ?? datosOriginales.rows[0].telefono,
    email: email ?? datosOriginales.rows[0].email,
    tipousuario: datosOriginales.rows[0].tipousuario,
  };

  const result = await pool.query(
    "UPDATE veterinara SET nombre = $1, direccion = $2, cuil = $3, password = $4, telefono = $5, email = $6, tipousuario = &7",
    [nombre, direccion, cuil, password, telefono, email, tipousuario]
  );

  return res.json(result.rows[0]);
  next(error);
};

export const createVet = async (req, res, next) => {
  const { nombre, apellido, email, password, matricula, tipousuario } = req.body;
  const idveterinaria = req.userId;

  try {    
    const hashedPass = await bcrypt.hash(password, 10);

    let fotoUrl = null; 

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "veterinaria",
      });
      fotoUrl = uploadResult.secure_url; // url de la imagen
    }

    const result = await pool.query(
      "INSERT INTO veterinario(nombre, apellido, email, password, matricula, foto, tipousuario, idveterinaria) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [nombre, apellido, email, hashedPass, matricula, fotoUrl, tipousuario, idveterinaria]
    );

    res.send({
      message: "Veterinario agregado",
      registro: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe el registro",
      });
    }
    next(error);
  }
};

export const deleteVete = async (req, res, next) => {
  const id = req.params.id;

  const result = await pool.query(
    "DELETE FROM veterinario WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Veterinario no encontrado" });
  }

  res.json({ message: "Veterinario borrado", veterinario: result.rows[0] });
  next(error);
};

export const getVets = async (req, res) => {
  const idveterinaria = req.userId;
  const result = await pool.query(
    "SELECT * FROM veterinario WHERE idVeterinaria = $1",
    [idveterinaria]
  );

  if (result.rowCount === 0) {
    return res
      .status(404)
      .json({ message: "No Se Agregaron Veterinarios Todavia" });
  }

  return res.json({
    message: "Lista de veterinarios obtenidos",
    registro: result.rows,
  });

  next(error);
};

export const allUsers = async (req, res, next) => {
  try {
    const usuarios = await pool.query(`SELECT 
        users.id AS id_duenio,
        users.nombre AS dueño_nombre, 
        users.apellido AS dueño_apellido, 
        users.email AS dueño_email, 
        registro.fecha AS ultima_visita,
        registro.procedimientodescrip AS descripcion_procedimiento
      FROM users
      JOIN registro ON users.id = registro.idduenio;
    `);

    //Muestra un solo usuario
    const result = Array.from(
      new Map(usuarios.rows.map((obj) => [obj.id_duenio, obj])).values()
    );

    return res.json({
      message: "Usuarios encontrados",
      mascotas: result,
    });
  } catch (error) {
    next(error);
  }
};

export const all_pets = async (req, res, next) => {
  try {
    const mascotas = await pool.query(`
      SELECT 
	      users.id AS id_duenio,
        users.nombre AS dueño_nombre, 
        users.apellido AS dueño_apellido, 
        users.email AS dueño_email, 
        mascotas.id AS id_mascota,
        mascotas.nombre AS mascota_nombre, 
        mascotas.raza, 
        mascotas.edad,
        registro.id AS id_registro,
        registro.procedimiento AS ultimo_procedimiento,
        registro.fecha AS ultima_visita
      FROM users
      JOIN registro ON users.id = registro.idduenio
      JOIN mascotas ON mascotas.id = registro.idmascota 
    `);

    //Muestra una mascota por usuario
    const result = Array.from(
      new Map(mascotas.rows.map((obj) => [obj.id_mascota, obj])).values()
    );

    return res.json({
      message: "Mascotas encontradas",
      mascotas: result,
    });
  } catch (error) {
    next(error);
  }
};
