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
exports.eliminarCategoria = exports.obtenerCategorias = exports.modificarCategoria = exports.agregarCategoria = exports.existeCategoria = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const categoria_1 = __importDefault(require("../models/categoria"));
const existeCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, nombre } = req.query;
        const consulta = `SELECT 1 FROM Categorias 
            WHERE id_usuario = :id_usuario AND nombre = :nombre`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { id_usuario, nombre },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (result.length != 0) {
            res.json({ respuesta: true, msg: 'La categoria ya existe en la base de datos' });
        }
        else {
            res.json({ respuesta: false, msg: 'La categoria no existe en la base de datos' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
});
exports.existeCategoria = existeCategoria;
const agregarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //usar existe categoria  antes de llamar
    try {
        const { id_usuario, nombre } = req.body;
        const consulta = `INSERT INTO Categorias (id_usuario,nombre) 
                VALUES (:id_usuario,:nombre)`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { id_usuario, nombre },
            type: sequelize_1.QueryTypes.INSERT,
        });
        if (result[1] > 0) {
            res.json({ msg: 'La categoria fue agregada con exito' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al agregar la categoria' });
    }
});
exports.agregarCategoria = agregarCategoria;
const modificarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //usar existe categoria  antes de llamar
    try {
        const { nombre } = req.body;
        const { id_categoria } = req.params;
        const consulta = `UPDATE Categorias
            SET nombre = :nombre
            WHERE id_categoria = :id_categoria`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { nombre, id_categoria },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        if (result[1] > 0) {
            res.json({ msg: 'La categoria fue modificada con exito' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al agregar la categoria' });
    }
});
exports.modificarCategoria = modificarCategoria;
const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario } = req.query;
        const categorias = yield categoria_1.default.findAll({
            where: {
                id_usuario: id_usuario
            }
        });
        res.json(categorias);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener categorias' });
    }
});
exports.obtenerCategorias = obtenerCategorias;
const eliminarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //usar verificar contrasenia de usuario antes de llamar 
    try {
        const { id_categoria } = req.query;
        const consulta = `DELETE FROM Tareas
            WHERE id_categoria = :id_categoria`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { id_categoria },
            type: sequelize_1.QueryTypes.DELETE,
        });
        const consulta2 = `DELETE FROM Categorias
            WHERE id_categoria = :id_categoria`;
        const result2 = yield connection_1.default.query(consulta2, {
            replacements: { id_categoria },
            type: sequelize_1.QueryTypes.DELETE,
        });
        res.json({ msg: 'Categoria eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoria' });
    }
});
exports.eliminarCategoria = eliminarCategoria;
