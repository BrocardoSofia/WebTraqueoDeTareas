"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Temporizador = connection_1.default.define('Temporizadores', {
    id_temporizador: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    },
    minutos_tarea: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    minutos_descanso: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    minutos_agua: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    ejercicio: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Temporizador;
