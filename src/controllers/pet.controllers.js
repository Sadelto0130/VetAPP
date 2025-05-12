import { pool } from "../db.js";
import upload from "../libs/multer.js";
import cloudinary from "../libs/cloudinary.js";
import {obtenerPublicId} from "../libs/publicID.js"; 

export const addPet = async (req, res, next) => {

  try {
    const { nombre, raza, fecha_nacimiento, tipo, peso, idduenio } = req.body;
    const estado = true; // valor por defecto

    console.log(req.body);

    let fotoUrl = null;
    
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "veterinaria",
      });
      fotoUrl = uploadResult.secure_url; // url de la imagen
    }

    const result = await pool.query(
      "INSERT INTO mascotas (nombre, foto, raza, tipo_mascota,  idduenio, peso, estado, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7, TO_DATE($8, 'YYYY-MM-DD')) RETURNING *",
      [nombre, fotoUrl, raza, tipo,  idduenio, peso, estado, fecha_nacimiento]
    );

    return res.json({
      message: "Mascota agregada",
      mascota: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const getPets = async (req, res, next) => {
  const idduenio = req.userId;
  const result = await pool.query("SELECT * FROM mascotas WHERE idduenio = $1  ORDER BY nombre", [idduenio]);
  return res.json(result.rows);
  next(error);
};

export const getPet = async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM mascotas WHERE id = $1", [
    id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  return res.json(result.rows[0]);
  next(error);
};

export const updatePet = async (req, res, next) => {
  const id = req.params.id;
  const { nombre, foto, raza, fecha_nacimiento, tipo, peso } = req.body;

  const datosOriginales = await pool.query(
    "SELECT * FROM mascotas WHERE id = $1", 
    [id]
  );

  if (datosOriginales.rowCount === 0) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  const updatePet = {
    nombre: nombre ?? datosOriginales.rows[0].nombre,
    foto: req.file?.path ?? datosOriginales.rows[0].foto,
    raza: raza ?? datosOriginales.rows[0].raza,
    fecha_nacimiento: fecha_nacimiento ?? datosOriginales.rows[0].fecha_nacimiento,
    tipo: tipo ?? datosOriginales.rows[0].tipo,
    peso: peso ?? datosOriginales.rows[0].peso,
  };

  const result = await pool.query(
    "UPDATE mascotas SET nombre = $1, foto = $2, raza = $3, fecha_nacimiento = $4, tipo = $5, peso = $6 WHERE id = $7 RETURNING *",
    [
      updatePet.nombre,
      updatePet.foto,
      updatePet.raza,
      updatePet.fecha_nacimiento,
      updatePet.tipo,
      updatePet.peso,
      id,
    ]
  );

  return res.json(result.rows[0]);
  next(error);
};

export const deletePet = async (req, res, next) => {
  try {
    const id = req.params.id;

    const fotoPet = await pool.query(
      "SELECT foto FROM mascotas WHERE id = $1",
      [id]
    );

    if (fotoPet.rows.length === 0) {
      return res.status(400).json({ message: "Mascota no encontrada" });
    }

    const fotoUrl = fotoPet.rows[0].foto;

    if (fotoUrl) {
      const publicId = obtenerPublicId(fotoUrl);
      await cloudinary.uploader.destroy(publicId);
    }

    const result = await pool.query(
      "DELETE FROM mascotas WHERE id = $1 RETURNING *",
      [id]
    );
    res.json({ message: "Mascota eliminada", mascota: result.rows[0] });
  } catch (error) {
    next(error);
  }
};
