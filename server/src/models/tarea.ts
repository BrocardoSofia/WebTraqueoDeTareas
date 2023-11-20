import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Tarea = db.define('Tareas',{
    id_tarea : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    id_categoria : {
        type : DataTypes.INTEGER, //FK
        allowNull: false,
        references: {
            model: 'Categorias',
            key: 'id_categoria'
        }
    },
    nombre : {
        type : DataTypes.STRING, 
        allowNull: false
    },
    tiempo : {
        type : DataTypes.INTEGER, 
        allowNull: false
    },
    fecha : {
        type : DataTypes.STRING, 
        allowNull: false
    },
},{
    createdAt : false,
    updatedAt : false
});

export default Tarea;