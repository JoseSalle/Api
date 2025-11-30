const db = require('../config/db');

exports.getAllProveedores = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM proveedores');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProveedorById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM proveedores WHERE id = ?', [req.params.id]);
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).send('Proveedor no encontrado');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProveedor = async (req, res) => {
    const { nombre, contacto, telefono, correo, direccion } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO proveedores (nombre, contacto, telefono, correo, direccion) VALUES (?, ?, ?, ?, ?)',
            [nombre, contacto, telefono, correo, direccion]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProveedor = async (req, res) => {
    const { nombre, contacto, telefono, correo, direccion } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, correo = ?, direccion = ? WHERE id = ?',
            [nombre, contacto, telefono, correo, direccion, req.params.id]
        );
        if (result.affectedRows > 0) res.json({ id: req.params.id, ...req.body });
        else res.status(404).send('Proveedor no encontrado');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProveedor = async (req, res) => {
    try {
        const [products] = await db.query('SELECT count(*) as count FROM productos WHERE proveedor_id = ?', [req.params.id]);
        if (products[0].count > 0) {
            return res.status(400).json({ error: 'No se puede eliminar el proveedor porque tiene productos asociados.' });
        }

        const [result] = await db.query('DELETE FROM proveedores WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) res.status(204).send();
        else res.status(404).send('Proveedor no encontrado');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
