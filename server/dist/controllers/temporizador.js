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
exports.obtenerTemporizador = exports.modificarTemporizador = exports.guardarTemporizador = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const temporizador_1 = __importDefault(require("../models/temporizador"));
const guardarTemporizador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, minutos_tarea, minutos_descanso, minutos_agua, ejercicio } = req.body;
        const consulta = 'INSERT INTO Temporizadores (id_usuario, minutos_tarea, minutos_descanso , minutos_agua, ejercicio) VALUES (:id_usuario,:minutos_tarea,:minutos_descanso ,:minutos_agua,:ejercicio)';
        const result = yield connection_1.default.query(consulta, {
            replacements: { id_usuario, minutos_tarea, minutos_descanso, minutos_agua, ejercicio },
            type: sequelize_1.QueryTypes.INSERT,
        });
        if (result[1] > 0) {
            res.json({ msg: 'El temporizador fue guardado con exito' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al intentar guardar el temporizador' });
    }
});
exports.guardarTemporizador = guardarTemporizador;
const modificarTemporizador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { minutos_tarea, minutos_descanso, minutos_agua, ejercicio } = req.body;
        const { id_usuario } = req.params;
        const consulta = `UPDATE Temporizadores
            SET minutos_tarea = :minutos_tarea, minutos_descanso = :minutos_descanso , minutos_agua = :minutos_agua, ejercicio = :ejercicio
            WHERE id_usuario = :id_usuario`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { minutos_tarea, minutos_descanso, minutos_agua, ejercicio, id_usuario },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        if (result[1] > 0) {
            res.json({ msg: 'El temporizador fue modificado con exito' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al modificar el temporizador' });
    }
});
exports.modificarTemporizador = modificarTemporizador;
const obtenerTemporizador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario } = req.query;
        const temporizador = yield temporizador_1.default.findAll({
            where: {
                id_usuario: id_usuario
            }
        });
        res.json(temporizador);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el temporizador' });
    }
});
exports.obtenerTemporizador = obtenerTemporizador;
