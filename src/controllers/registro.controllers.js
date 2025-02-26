import { pool } from "../db.js";

export const getAllRegistro = async (req, res, next) => {
  const result = await pool.query("SELECT * FROM registro");
  return res.json(result.rows);
};

export const getRegistro = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM registro WHERE idRegistro = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createRegistro = async (req, res, next) => {
  const {
    idMascota,
    idDuenio,
    idVeterinario,
    fecha,
    procedimiento,
    procedimientoDescrip,
  } = req.body;

  try {
    // db insert
    const result = await pool.query(
      "INSERT INTO registro (idMascota, idDuenio, idVeterinario, fecha, procedimiento, procedimientoDescrip) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        idMascota,
        idDuenio,
        idVeterinario,
        fecha,
        procedimiento,
        procedimientoDescrip,
      ]
    );

    console.log(result.rows[0]);
    res.send("Agregando registro de actividad");
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
  const { idVeterinario, fecha, procedimiento, procedimientoDescrip } =
    req.body;

  const datosOriginales = await pool.query(
    "SELECT * FROM registro WHERE idregistro = $1",
    [id]
  );

  if (datosOriginales.rowCount === 0) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  const updateRegistro = {
    idVeterinario: idVeterinario ?? datosOriginales.rows[0].idVeterinario,
    fecha: fecha ?? datosOriginales.rows[0].fecha,
    procedimiento: procedimiento ?? datosOriginales.rows[0].procedimiento,
    procedimientoDescrip:
      procedimientoDescrip ?? datosOriginales.rows[0].procedimientoDescrip,
  };

  const result = await pool.query(
    "UPDATE registro SET idveterinario = $1, fecha = $2, procedimiento = $3, procedimientoDescrip = $4 WHERE idregistro = $5 RETURNING *",
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
