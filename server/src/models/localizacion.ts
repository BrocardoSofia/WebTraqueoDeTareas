import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Localizacion = db.define('Localizacion', {
    id_localizacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER, //FK
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    },
    latitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
    },
    longitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default Localizacion;