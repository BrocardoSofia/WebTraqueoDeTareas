import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Categoria = db.define('Categorias',{
    id_categoria: {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    id_usuario: {
        type : DataTypes.INTEGER, //FK
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    },
    nombre: {
        type : DataTypes.STRING,
        allowNull: false
    },
},{
    createdAt : false,
    updatedAt : false
});

export default Categoria;