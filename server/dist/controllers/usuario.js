"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modificarNombre = exports.modificarEmail = exports.modificarClave = exports.verificarClave = exports.obtenerUsuario = exports.login = exports.registrarUsuario = exports.existeEmail = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const existeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const consulta = 'SELECT id FROM Usuarios WHERE email = :email';
        const result = yield connection_1.default.query(consulta, {
            replacements: { email },
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
});
exports.existeEmail = existeEmail;
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, nombre, clave } = req.body;
        const consulta = 'INSERT INTO Usuarios (email,nombre,clave) VALUES (:email,:nombre,:clave)';
        const result = yield connection_1.default.query(consulta, {
            replacements: { email, nombre, clave },
            type: sequelize_1.QueryTypes.INSERT,
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al intentar registrar al usuario' });
    }
});
exports.registrarUsuario = registrarUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, clave } = req.query;
        const consulta = 'SELECT id FROM Usuarios WHERE email = :email AND clave = :clave';
        const result = yield connection_1.default.query(consulta, {
            replacements: { email, clave },
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al intentar ingresar' });
    }
});
exports.login = login;
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const consulta = `SELECT u.email, u.nombre, t.minutos_tarea, t.minutos_descanso, t.minutos_agua, t.ejercicio, l.longitud, l.latitud
            FROM Usuarios AS u
            INNER JOIN Temporizadores AS t
            ON u.id = t.id
            INNER JOIN Localizacion as l 
            ON u.id = l.id
            WHERE u.id = :id`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (result.length != 0) {
            res.json({ respuesta: result, msg: 'Obtencion del usuario exitoso' });
        }
        else {
            res.json({ respuesta: false, msg: 'El id del usuario no existe' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error obtener el usuario' });
    }
});
exports.obtenerUsuario = obtenerUsuario;
const verificarClave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clave } = req.query;
        const { id } = req.params;
        const consulta = `SELECT 1 FROM Usuarios
            WHERE id = :id AND clave = :clave`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { id, clave },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (result.length != 0) {
            res.json({ respuesta: true, msg: 'Clave correcta' });
        }
        else {
            res.json({ respuesta: false, msg: 'Clave incorrecta' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al intentar autenticar la clave' });
    }
});
exports.verificarClave = verificarClave;
const modificarClave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //usar verificar clave antes de llamar
    try {
        const { clave } = req.body;
        const { id } = req.params;
        const consulta = `UPDATE Usuarios
            SET clave = :clave
            WHERE id = :id`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { clave, id },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        if (result[1] > 0) {
            res.json({ msg: 'La clave fue modificada con exito' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al cambiar la clave' });
    }
});
exports.modificarClave = modificarClave;
const modificarEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //usar verificar clave antes de llamar
    try {
        const { email } = req.body;
        const { id } = req.params;
        const consulta = `UPDATE Usuarios
            SET email = :email
            WHERE id = :id`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { email, id },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        if (result[1] > 0) {
            res.json({ msg: 'El email fue modificado con exito' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al cambiar el email' });
    }
});
exports.modificarEmail = modificarEmail;
const modificarNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //usar verificar clave antes de llamar
    try {
        const { nombre } = req.body;
        const { id } = req.params;
        const consulta = `UPDATE Usuarios
            SET nombre = :nombre
            WHERE id = :id`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { nombre, id },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        if (result[1] > 0) {
            res.json({ msg: 'El noombre fue modificado con exito' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al cambiar el nombre' });
    }
});
exports.modificarNombre = modificarNombre;
