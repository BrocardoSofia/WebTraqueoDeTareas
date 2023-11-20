"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Localizacion = connection_1.default.define('Localizacion', {
    id_localizacion: {
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
    latitud: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
        allowNull: false,
    },
    longitud: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Localizacion;
