import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Categoria = db.define('Categoria',{
    nombre: {
        type : DataTypes.STRING
    },
    id_usuario: {
        type : DataTypes.INTEGER
    },
});

export default Categoria;