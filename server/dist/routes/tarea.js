"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarea_1 = require("../controllers/tarea");
const router = (0, express_1.Router)();
router.post('/', tarea_1.guardarTarea); //recibe un body
router.get('/', tarea_1.obtenerTareas); // recibe una query
router.get('/nombres', tarea_1.obtenerNombresTareas); // recibe una query
exports.default = router;
