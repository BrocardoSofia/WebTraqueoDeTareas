"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localizacion_1 = require("../controllers/localizacion");
const router = (0, express_1.Router)();
router.get('/', localizacion_1.tieneLocalizacion); //recibe una query
router.post('/', localizacion_1.guardarLocalizacion); //recibe body
router.put('/:id_usuario', localizacion_1.modificarLocalizacion); // recibe params y body
router.delete('/', localizacion_1.eliminarLocalizacion); //recibe query
exports.default = router;
