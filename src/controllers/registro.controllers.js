import { pool } from "../db.js";

export const getAllRegistro = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM registro");
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
      "SELECT * FROM registro WHERE id_mascota = $1 ORDER BY fecha_creacion DESC",
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
  const result = await pool.query("SELECT * FROM registro WHERE id = $1", [id]);

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
      "SELECT * FROM mascotas WHERE id = $1",
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
  const { fecha, procedimiento, procedimientoDescrip } = req.body;

  const datosOriginales = await pool.query(
    "SELECT * FROM registro WHERE idregistro = $1",
    [id]
  );

  if (datosOriginales.rowCount === 0) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  const updateRegistro = {
    idVeterinario: datosOriginales.rows[0].id,
    fecha: fecha ?? datosOriginales.rows[0].fecha,
    procedimiento: procedimiento ?? datosOriginales.rows[0].procedimiento,
    procedimientoDescrip:
      procedimientoDescrip ?? datosOriginales.rows[0].procedimientoDescrip,
  };

  const result = await pool.query(
    "UPDATE registro SET idveterinario = $1, fecha = $2, procedimiento = $3, procedimientoDescrip = $4 WHERE id = $5 RETURNING *",
    [
      updateRegistro.idVeterinario,
      updateRegistro.fecha,
      updateRegistro.procedimiento,
      updateRegistro.procedimientoDescrip,
      id,
    ]
  );

  return res.json(result.rows[0]);
  next(error);
};

export const getUserRecordsPets = async (req, res, next) => {
  const id = req.userId;
  try {
    const result = await pool.query(`
      SELECT 
        r.id AS registro_id, 
        r.procedimiento,  
        r.procedimiento_descrip, 
        r.fecha_creacion, 
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
