"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const temporizador_1 = require("../controllers/temporizador");
const router = (0, express_1.Router)();
router.post('/', temporizador_1.guardarTemporizador); //recibe body
router.put('/:id_usuario', temporizador_1.modificarTemporizador); //recibe params y body 
router.get('/', temporizador_1.obtenerTemporizador); //recibe query
exports.default = router;
