import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Usuario = db.define('Usuarios',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    email : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre : {
        type : DataTypes.STRING,
        allowNull: false
    },
    clave : {
        type : DataTypes.STRING,
        allowNull: false,
    }
},{
    createdAt : false,
    updatedAt : false
});

export default Usuario;