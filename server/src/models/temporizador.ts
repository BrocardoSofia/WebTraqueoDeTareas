import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Temporizador = db.define('Temporizadores',{
    id_temporizador : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    id_usuario : {
        type : DataTypes.INTEGER, //FK
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    },
    minutos_tarea : {
        type : DataTypes.FLOAT,
        allowNull: false,
    },
    minutos_descanso : {
        type : DataTypes.FLOAT,
        allowNull: false,
    },
    minutos_agua : {
        type : DataTypes.FLOAT,
        allowNull: false,
    },
    ejercicio : {
        type : DataTypes.TINYINT,
        allowNull: false
    }
},{
    createdAt : false,
    updatedAt : false
});

export default Temporizador;