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
exports.tiempoDeTarea = exports.tiempoDeCategoria = exports.obtenerNombresTareas = exports.obtenerTareas = exports.guardarTarea = void 0;
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
        const nombresUnicos = nombres.map((tarea) => tarea.get('nombre')); // Obtener solo los nombres
        res.json(nombresUnicos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
});
exports.obtenerNombresTareas = obtenerNombresTareas;
const tiempoDeCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_categoria } = req.query;
        const resultado = yield tarea_1.default.findOne({
            attributes: [
                [connection_1.default.fn('SUM', connection_1.default.col('tiempo')), 'total_tiempo']
            ],
            where: {
                id_categoria: id_categoria
            }
        });
        const totalTiempo = (resultado === null || resultado === void 0 ? void 0 : resultado.get('total_tiempo')) || 0; // Valor total del tiempo
        res.json(totalTiempo); // Devolver solo el valor numérico
    }
    catch (error) {
        res.status(500).json({ error: 'Error al calcular el tiempo de la categoría' });
    }
});
exports.tiempoDeCategoria = tiempoDeCategoria;
const tiempoDeTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.query;
        const resultado = yield tarea_1.default.findOne({
            attributes: [
                [connection_1.default.fn('SUM', connection_1.default.col('tiempo')), 'total_tiempo']
            ],
            where: {
                nombre: nombre
            }
        });
        const totalTiempo = (resultado === null || resultado === void 0 ? void 0 : resultado.get('total_tiempo')) || 0; // Valor total del tiempo
        res.json(totalTiempo); // Devolver solo el valor numérico
    }
    catch (error) {
        res.status(500).json({ error: 'Error al calcular el tiempo de la categoría' });
    }
});
exports.tiempoDeTarea = tiempoDeTarea;
