"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Tarea = connection_1.default.define('Tareas', {
    id_tarea: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_categoria: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categorias',
            key: 'id_categoria'
        }
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tiempo: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Tarea;
