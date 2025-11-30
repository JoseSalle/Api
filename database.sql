CREATE DATABASE IF NOT EXISTS inventario_db;
USE inventario_db;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(255),
    direccion TEXT
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    categoria_id INT NOT NULL,
    proveedor_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id) ON DELETE RESTRICT
);

-- Insertar datos de prueba
INSERT INTO categorias (nombre, descripcion) VALUES 
('Electrónica', 'Dispositivos electrónicos y gadgets'), 
('Ropa', 'Prendas de vestir para todas las edades'), 
('Hogar', 'Artículos para el hogar y decoración'),
('Deportes', 'Equipamiento y ropa deportiva'),
('Juguetes', 'Juguetes y juegos para niños');

INSERT INTO proveedores (nombre, telefono, correo, direccion) VALUES 
('TechSolutions', '555-0101', 'contacto@techsolutions.com', 'Av. Tecnologica 123, Ciudad'), 
('ModaGlobal', '555-0202', 'ventas@modaglobal.com', 'Calle de la Moda 45, Centro'),
('HomeEssentials', '555-0303', 'info@homeessentials.com', 'Blvd. del Hogar 789, Norte'),
('SportLife', '555-0404', 'soporte@sportlife.com', 'Camino al Estadio 10, Sur');

INSERT INTO productos (nombre, precio, stock, categoria_id, proveedor_id) VALUES 
('Laptop Gamer', 1500.00, 5, 1, 1),
('Smartphone Pro', 800.00, 20, 1, 1),
('Auriculares Bluetooth', 50.00, 100, 1, 1),
('Camiseta Algodón', 15.00, 50, 2, 2),
('Jeans Clásicos', 40.00, 30, 2, 2),
('Zapatillas Running', 80.00, 25, 2, 4),
('Licuadora Potente', 60.00, 15, 3, 3),
('Cafetera Express', 120.00, 10, 3, 3),
('Juego de Sábanas', 35.00, 40, 3, 2),
('Pelota de Fútbol', 25.00, 60, 4, 4),
('Raqueta de Tenis', 100.00, 10, 4, 4),
('Muñeca Articulada', 30.00, 20, 5, 2),
('Juego de Mesa', 45.00, 15, 5, 1);
