"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_1 = require("../controllers/categoria");
const router = (0, express_1.Router)();
router.get('/existe-categoria', categoria_1.existeCategoria); //recibe query 
router.post('/agregar-categoria', categoria_1.agregarCategoria); //recibe body
router.put('/modificar-categoria/:id_categoria', categoria_1.modificarCategoria); //recibe params y body 
router.get('/', categoria_1.obtenerCategorias); //recibe query
router.delete('/:id', categoria_1.eliminarCategoria); //recibe params
exports.default = router;
