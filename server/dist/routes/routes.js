"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_1 = require("../controllers/categoria");
const router = (0, express_1.Router)();
router.get('/', categoria_1.getCategorias);
router.get('/:id', categoria_1.getCategoria);
router.delete('/:id', categoria_1.deleteCategoria);
router.post('/', categoria_1.postCategoria);
router.put('/:id', categoria_1.updateCategoria);
exports.default = router;
