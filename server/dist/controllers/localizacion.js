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
exports.eliminarLocalizacion = exports.modificarLocalizacion = exports.guardarLocalizacion = exports.tieneLocalizacion = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const tieneLocalizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario } = req.query;
        const consulta = `SELECT 1 FROM Localizacion 
            WHERE id_usuario = :id_usuario`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { id_usuario },
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
});
exports.tieneLocalizacion = tieneLocalizacion;
const guardarLocalizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, latitud, longitud } = req.body;
        const consulta = 'INSERT INTO Localizacion (id_usuario,latitud,longitud) VALUES (:id_usuario, :latitud, :longitud)';
        const result = yield connection_1.default.query(consulta, {
            replacements: { id_usuario, latitud, longitud },
            type: sequelize_1.QueryTypes.INSERT,
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al guardar la localizacion' });
    }
});
exports.guardarLocalizacion = guardarLocalizacion;
const modificarLocalizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { latitud, longitud } = req.body;
        const { id_usuario } = req.params;
        const consulta = `UPDATE Localizacion
            SET latitud = :latitud, longitud = :longitud
            WHERE id_usuario = :id_usuario`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { latitud, longitud, id_usuario },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        if (result[1] > 0) {
            res.json({ msg: 'La localizacion fue modificado con exito' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al cambiar la localizacion' });
    }
});
exports.modificarLocalizacion = modificarLocalizacion;
const eliminarLocalizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario } = req.query;
        const consulta = `DELETE FROM Localizacion
            WHERE id_usuario = :id_usuario`;
        const result = yield connection_1.default.query(consulta, {
            replacements: { id_usuario },
            type: sequelize_1.QueryTypes.DELETE,
        });
        res.json({ msg: 'Localizacion eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar la localizacion' });
    }
});
exports.eliminarLocalizacion = eliminarLocalizacion;
