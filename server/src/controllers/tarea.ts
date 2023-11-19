import { Request, Response } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
import Tarea from '../models/tarea';

export const obtenerTareas = async (req: Request, res: Response) => {
    try {
        const { id_categoria } = req.query;

        const tareas = await Tarea.findAll({
            where: {
                id_categoria: id_categoria
            }
        });

        res.json(tareas)
        
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
}