import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Categoria = db.define('Categorias',{
    id_categoria: {
        type : DataTypes.INTEGER,
        primaryKey : true
    },
    id_usuario: {
        type : DataTypes.INTEGER
    },
    nombre: {
        type : DataTypes.STRING
    },
},{
    createdAt : false,
    updatedAt : false
});

export default Categoria;