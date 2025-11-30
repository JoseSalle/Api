const db = require('../config/db');

exports.getAllProductos = async (req, res) => {
    try {
        const query = `
            SELECT p.id, p.nombre, p.precio, p.stock, c.nombre as categoria, pr.nombre as proveedor 
            FROM productos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id 
            LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductoById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).send('Producto no encontrado');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProducto = async (req, res) => {
    // Frontend sends 'categoria' and 'proveedor' (IDs)
    const { nombre, precio, stock, categoria, proveedor } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO productos (nombre, precio, stock, categoria_id, proveedor_id) VALUES (?, ?, ?, ?, ?)',
            [nombre, precio, stock, categoria, proveedor]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProducto = async (req, res) => {
    const { nombre, precio, stock, categoria, proveedor } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?, proveedor_id = ? WHERE id = ?',
            [nombre, precio, stock, categoria, proveedor, req.params.id]
        );
        if (result.affectedRows > 0) res.json({ id: req.params.id, ...req.body });
        else res.status(404).send('Producto no encontrado');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProducto = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) res.status(204).send();
        else res.status(404).send('Producto no encontrado');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
