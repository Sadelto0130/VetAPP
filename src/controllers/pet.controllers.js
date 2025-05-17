import { pool } from "../db.js";
import cloudinary from "../libs/cloudinary.js";
import { obtenerPublicId } from "../libs/publicID.js";

// ✅ Crear nueva mascota
export const addPet = async (req, res, next) => {
  try {
    const { nombre, raza, fecha_nacimiento, tipo_mascota, peso, idduenio } = req.body;
    const estado = true;

    let fotoUrl = null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "veterinaria",
      });
      fotoUrl = uploadResult.secure_url;
    }

    const result = await pool.query(
      `INSERT INTO mascotas 
        (nombre, foto, raza, tipo, idduenio, peso, estado, fecha_nacimiento) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, TO_DATE($8, 'YYYY-MM-DD')) 
        RETURNING *`,
      [nombre, fotoUrl, raza, tipo_mascota, idduenio, peso, estado, fecha_nacimiento]
    );

    return res.json({
      message: "Mascota agregada",
      mascota: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Obtener todas las mascotas del dueño autenticado
export const getPets = async (req, res, next) => {
  try {
    const idduenio = req.userId;
    const result = await pool.query(
      "SELECT * FROM mascotas WHERE idduenio = $1 ORDER BY nombre",
      [idduenio]
    );
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// ✅ Obtener una mascota específica
export const getPet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM mascotas WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// ✅ Actualizar una mascota
export const updatePet = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { nombre, raza, fecha_nacimiento, tipo, peso } = req.body;

    const mascotaActual = await pool.query("SELECT * FROM mascotas WHERE id = $1", [id]);

    if (mascotaActual.rowCount === 0) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    let nuevaFoto = mascotaActual.rows[0].foto;

    if (req.file) {
      // Borra la imagen anterior de Cloudinary
      if (nuevaFoto) {
        const publicId = obtenerPublicId(nuevaFoto);
        await cloudinary.uploader.destroy(publicId);
      }

      // Sube la nueva imagen
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "veterinaria",
      });
      nuevaFoto = uploadResult.secure_url;
    }

    const result = await pool.query(
      `UPDATE mascotas SET 
        nombre = $1, 
        foto = $2, 
        raza = $3, 
        fecha_nacimiento = $4, 
        tipo = $5, 
        peso = $6 
      WHERE id = $7 
      RETURNING *`,
      [
        nombre ?? mascotaActual.rows[0].nombre,
        nuevaFoto,
        raza ?? mascotaActual.rows[0].raza,
        fecha_nacimiento ?? mascotaActual.rows[0].fecha_nacimiento,
        tipo ?? mascotaActual.rows[0].tipo,
        peso ?? mascotaActual.rows[0].peso,
        id,
      ]
    );

    return res.json({
      message: "Mascota actualizada",
      mascota: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Eliminar una mascota
export const deletePet = async (req, res, next) => {
  try {
    const id = req.params.id;

    const mascota = await pool.query("SELECT foto FROM mascotas WHERE id = $1", [id]);

    if (mascota.rowCount === 0) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    const fotoUrl = mascota.rows[0].foto;

    // Borra la imagen de Cloudinary si existe
    if (fotoUrl) {
      const publicId = obtenerPublicId(fotoUrl);
      await cloudinary.uploader.destroy(publicId);
    }

    const result = await pool.query("DELETE FROM mascotas WHERE id = $1 RETURNING *", [id]);

    return res.json({ message: "Mascota eliminada", mascota: result.rows[0] });
  } catch (error) {
    next(error);
  }
};
