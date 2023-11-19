"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarea_1 = require("../controllers/tarea");
const router = (0, express_1.Router)();
router.get('/', tarea_1.obtenerTareas); // recibe una query
