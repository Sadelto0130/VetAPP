import { pool } from "../db.js";

export const getAllRegistro = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM registro AND estado != 'inactivo'"
    );
    return res.json({
      message: "Registros obtenidos",
      registro: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRegistroPet = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM registro WHERE id_mascota = $1 AND estado != 'inactivo' ORDER BY fecha_creacion DESC",
      [id]
    );
    return res.json({
      message: "Registros obtenidos",
      registro: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistro = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM registro WHERE id = $1 AND estado != 'inactivo'",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  return res.json(result.rows[0]);
};

/* export const getRegistrosPet = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM registro WHERE id_duenio = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  return res.json(result.rows[0]);
}; */

export const createRegistro = async (req, res, next) => {
  try {
    const { procedimiento, procedimiento_descrip, id_mascota, estado } =
      req.body;
    const id_duenio = req.userId;

    // db insert
    const existeMascota = await pool.query(
      "SELECT * FROM mascotas WHERE id = $1 AND estado = 'inactivo'",
      [id_mascota]
    );

    if (existeMascota.rowCount === 0) {
      return res.status(400).json({
        message: "No existe la mascota",
      });
    }

    // db insert
    const result = await pool.query(
      "INSERT INTO registro (id_mascota, id_duenio, procedimiento, procedimiento_descrip, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_mascota, id_duenio, procedimiento, procedimiento_descrip, estado]
    );

    return res.json({
      message: "Registro Agregado",
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

export const updateRegistro = async (req, res, next) => {
  const id = req.params.id;
  const { procedimiento, procedimiento_descrip, estado, id_veterinario } =
    req.body;

  const datosOriginales = await pool.query(
    "SELECT * FROM registro WHERE id = $1 AND estado != 'inactivo'",
    [id]
  );

  if (datosOriginales.rowCount === 0) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  const updateRegistro = {
    id_veterinario: id_veterinario ?? datosOriginales.rows[0].id_veterinario,
    procedimiento: procedimiento ?? datosOriginales.rows[0].procedimiento,
    procedimiento_descrip:
      procedimiento_descrip ?? datosOriginales.rows[0].procedimiento_descrip,
    estado: estado ?? datosOriginales.rows[0].estado,
  };

  try {
    console.log("enviado registro update");
    const result = await pool.query(
      "UPDATE registro SET id_veterinario = $1, procedimiento = $2, procedimiento_descrip = $3, estado = $4  WHERE id = $5 RETURNING *",
      [
        updateRegistro.id_veterinario,
        updateRegistro.procedimiento,
        updateRegistro.procedimiento_descrip,
        updateRegistro.estado,
        id,
      ]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar registro:", error.message);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getUserRecordsPets = async (req, res, next) => {
  const id = req.params.id; // ID del usuario desde los parámetros de la solicitud
  console.log("ID del usuario:", id); // Verifica el ID del usuario
  try {
    const result = await pool.query(`
      SELECT 
        r.id AS registro_id, 
        r.procedimiento,  
        r.procedimiento_descrip, 
        r.fecha_creacion, 
        r.estado,
        m.id AS mascota_id, 
        m.nombre, 
        m.raza, 
        m.tipo,
        m.fecha_nacimiento,
        m.foto,
        m.idduenio
      FROM registro r
      JOIN mascotas m ON CAST(r.id_mascota AS INTEGER) = m.id
      WHERE CAST(m.idduenio AS INTEGER) = ${id} 
      AND r.estado != 'inactivo'
      ORDER BY r.fecha_creacion DESC;
  `);
    return res.json({
      message: "Registros obtenidos",
      registro: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const inactiveRecord = async (req, res, next) => {
  const id = req.params.id; 
  try {
    const result = await pool.query(
      " DELETE FROM registro WHERE id = $1 RETURNING *",
      [id]
    );
    return res.json({ message: "Mascota eliminada", mascota: result.rows[0] });
  } catch (error) {
    console.error("Error al borrar registro:", error.message);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
