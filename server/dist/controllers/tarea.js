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
exports.obtenerNombresTareas = exports.obtenerTareas = exports.guardarTarea = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const tarea_1 = __importDefault(require("../models/tarea"));
const guardarTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_categoria, nombre, tiempo, fecha } = req.body;
        const consulta = `INSERT INTO Tareas (id_categoria,nombre,tiempo,fecha) 
            VALUES (:id_categoria,:nombre,:tiempo,:fecha)`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { id_categoria, nombre, tiempo, fecha },
            type: sequelize_1.QueryTypes.INSERT,
        });
        if (result[1] > 0) {
            res.json({ msg: 'La tarea fue guardada con exito' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al guardar la tarea' });
    }
});
exports.guardarTarea = guardarTarea;
const obtenerTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_categoria } = req.query;
        const tareas = yield tarea_1.default.findAll({
            where: {
                id_categoria: id_categoria
            }
        });
        res.json(tareas);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
});
exports.obtenerTareas = obtenerTareas;
const obtenerNombresTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_categoria } = req.query;
        const nombres = yield tarea_1.default.findAll({
            where: {
                id_categoria: id_categoria
            },
            attributes: [[connection_1.default.fn('DISTINCT', connection_1.default.col('nombre')), 'nombre']]
        });
        res.json(nombres);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
});
exports.obtenerNombresTareas = obtenerNombresTareas;
