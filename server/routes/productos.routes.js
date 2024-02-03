const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

// Ruta para obtener todos los productos
router.get('/', productosController.getProductos);

// Ruta para crear un nuevo producto
router.post('/', productosController.createProductos);

// Ruta para editar un producto por su descripcion
router.put('/:descripcion', productosController.editProductoByDescription);

// Ruta para eliminar un producto por su descripcion
router.delete('/:descripcion', productosController.deleteProductoByDescription);

module.exports = router;