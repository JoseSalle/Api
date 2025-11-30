const db = require('../config/db');

exports.getAllCategorias = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCategoriaById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [req.params.id]);
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).send('Categoría no encontrada');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const [result] = await db.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        res.status(201).json({ id: result.insertId, nombre, descripcion });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const [result] = await db.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, req.params.id]);
        if (result.affectedRows > 0) res.json({ id: req.params.id, nombre, descripcion });
        else res.status(404).send('Categoría no encontrada');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCategoria = async (req, res) => {
    try {
        const [products] = await db.query('SELECT count(*) as count FROM productos WHERE categoria_id = ?', [req.params.id]);
        if (products[0].count > 0) {
            return res.status(400).json({ error: 'No se puede eliminar la categoría porque tiene productos asociados.' });
        }

        const [result] = await db.query('DELETE FROM categorias WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) res.status(204).send();
        else res.status(404).send('Categoría no encontrada');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
