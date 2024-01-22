import { pool } from "../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getUsuario = async (req, res) => {
  try {
    console.log(req.params.id);
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE idUsuario = ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        message: "El usuario no se ha encontrado",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createUsuarios = async (req, res) => {
  try {
    const { nombres, edad, rol, imagen, fechadeNac } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO usuarios (nombres, edad,rol,imagen,fechadeNac) VALUES (?,?,?,?,?)",
      [nombres, edad, rol, imagen, fechadeNac]
    );
    res.send({
      id: rows.insertId,
      nombres,
      edad,
      rol,
      imagen,
      fechadeNac,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "DELETE FROM usuarios WHERE idUsuario = ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        message: "No hay usuarios para eliminar",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
export const updateUsuarios = async (req, res) => {
    const { id } = req.params;
    const { nombres, edad, rol, imagen, fechadeNac } = req.body;
    try {
    const [result] = await pool.query(
      "UPDATE usuarios SET nombres = IFNULL(?,nombres), edad = IFNULL(?,edad), rol = IFNULL(?,rol), imagen = IFNULL(?,imagen), fechadeNac = IFNULL(?,fechadeNac) WHERE idUsuario = ?",
      [nombres, edad, rol, imagen, fechadeNac, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "No users for update",
      });

    const [row] = await pool.query(
      "SELECT * FROM usuarios WHERE idUsuario = ?",
      [id]
    );
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
