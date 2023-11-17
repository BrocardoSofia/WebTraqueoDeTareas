"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Categoria = connection_1.default.define('Categorias', {
    id_categoria: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Categoria;
