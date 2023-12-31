"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const router = (0, express_1.Router)();
router.get('/verificar-email', usuario_1.existeEmail); //recibe query
router.post('/registrar-usuario', usuario_1.registrarUsuario); //recibe body
router.get('/login', usuario_1.login); //recibe query
router.get('/:id', usuario_1.obtenerUsuario); //recibe params
router.get('/verificar-clave/:id', usuario_1.verificarClave); //recibe params y query
router.put('/modificar-clave/:id', usuario_1.modificarClave); //recibe params y body
router.put('/modificar-email/:id', usuario_1.modificarEmail); //recibe params y body
router.put('/modificar-nombre/:id', usuario_1.modificarNombre); //recibe params y body
exports.default = router;
