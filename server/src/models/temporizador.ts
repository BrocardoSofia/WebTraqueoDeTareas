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
        type : DataTypes.TIME,
        allowNull: false,
    },
    minutos_descanso : {
        type : DataTypes.TIME,
        allowNull: false,
    },
    minutos_agua : {
        type : DataTypes.TIME,
        allowNull: false,
    },
    ejercicio : {
        type : DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    createdAt : false,
    updatedAt : false
});

export default Temporizador;