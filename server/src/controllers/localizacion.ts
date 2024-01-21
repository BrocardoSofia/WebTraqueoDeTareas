import { Request, Response, response } from 'express';
const sequelize = require('../db/connection');
import { QueryTypes } from 'sequelize';

export const tieneLocalizacion = async (req: Request, res: Response) => {
    try {
        const { id_usuario } = req.query;

        const consulta =
            `SELECT latitud,longitud FROM Localizacion 
            WHERE id_usuario = :id_usuario`;

        const result = await sequelize.query(consulta, {
            replacements: { id_usuario },
            type: QueryTypes.SELECT,
        });

        res.json(result)

    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
}

export const guardarLocalizacion = async (req: Request, res: Response) => {
    try {
        const { id_usuario, latitud, longitud } = req.body;

        const consulta =
            'INSERT INTO Localizacion (id_usuario,latitud,longitud) VALUES (:id_usuario, :latitud, :longitud)';

        const result = await sequelize.query(consulta, {
            replacements: { id_usuario, latitud, longitud },
            type: QueryTypes.INSERT,
        });

        res.json(result)
        
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la localizacion' });
    }
}

export const modificarLocalizacion = async (req: Request, res: Response) => {
    try {
        const { latitud,longitud } = req.body
        const { id_usuario } = req.params

        const consulta =
            `UPDATE Localizacion
            SET latitud = :latitud, longitud = :longitud
            WHERE id_usuario = :id_usuario`;

        const result = await sequelize.query(consulta, {
            replacements: { latitud, longitud, id_usuario },
            type: QueryTypes.UPDATE,
        });

        if (result[1] > 0) {
            res.json({ msg: 'La localizacion fue modificado con exito' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar la localizacion' })
    }
}

export const eliminarLocalizacion = async (req: Request, res: Response) => {

    try {
        const { id_usuario } = req.query;

        const consulta =
            `DELETE FROM Localizacion
            WHERE id_usuario = :id_usuario`;

        const result = await sequelize.query(consulta, {
            replacements: { id_usuario },
            type: QueryTypes.DELETE,
        });

        res.json({msg : 'Localizacion eliminada correctamente'})

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la localizacion' });
    }
}

