import { Request, Response } from 'express';
const sequelize = require('../db/connection');
import { QueryTypes } from 'sequelize';
import Temporizador from '../models/temporizador';

export const guardarTemporizador = async (req: Request, res: Response) => {
    try {
        const { id_usuario, minutos_tarea, minutos_descanso , minutos_agua, ejercicio } = req.body;

        const consulta =
            'INSERT INTO Temporizadores (id_usuario, minutos_tarea, minutos_descanso , minutos_agua, ejercicio) VALUES (:id_usuario,:minutos_tarea,:minutos_descanso ,:minutos_agua,:ejercicio)';

        const result = await sequelize.query(consulta, {
            replacements: { id_usuario, minutos_tarea, minutos_descanso , minutos_agua, ejercicio },
            type: QueryTypes.INSERT,
        });

        if (result[1] > 0) {
            res.json({ msg : 'El temporizador fue guardado con exito'})
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al intentar guardar el temporizador' });
    }
}

export const modificarTemporizador = async (req: Request, res: Response) => {
    try {
        const { minutos_tarea, minutos_descanso , minutos_agua, ejercicio } = req.body
        const { id_usuario } = req.params

        const consulta =
            `UPDATE Temporizadores
            SET minutos_tarea = :minutos_tarea, minutos_descanso = :minutos_descanso , minutos_agua = :minutos_agua, ejercicio = :ejercicio
            WHERE id_usuario = :id_usuario`;

        const result = await sequelize.query(consulta, {
            replacements: { minutos_tarea, minutos_descanso , minutos_agua, ejercicio, id_usuario},
            type: QueryTypes.UPDATE,
        });

        if (result[1] > 0) {
            res.json({ msg: 'El temporizador fue modificado con exito' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el temporizador' })
    }
}

export const obtenerTemporizador = async (req: Request, res: Response) => {
    try {
        const { id_usuario } = req.query;

        const temporizador = await Temporizador.findAll({
            where : {
                id_usuario : id_usuario
            }
        });

        res.json(temporizador)

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el temporizador' });
    }
}