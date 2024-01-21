import { Request, Response } from 'express';
const sequelize = require('../db/connection');
import { QueryTypes } from 'sequelize';
import Tarea from '../models/tarea';

export const guardarTarea = async (req: Request, res: Response) => {
    try {
        const { id_categoria, nombre, tiempo, fecha } = req.body;

        const consulta =
            `INSERT INTO Tareas (id_categoria,nombre,tiempo,fecha) 
            VALUES (:id_categoria,:nombre,:tiempo,:fecha)`;

        const result = await sequelize.query(consulta, {
            replacements: { id_categoria, nombre, tiempo, fecha },
            type: QueryTypes.INSERT,
        });

        if (result[1] > 0) {
            res.json({ msg: 'La tarea fue guardada con exito' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la tarea' });
    }
}

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

export const obtenerNombresTareas = async (req: Request, res: Response) => {
    try {
        const { id_categoria } = req.query;

        const nombres = await Tarea.findAll({
            where: {
                id_categoria: id_categoria
            },
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('nombre')), 'nombre']]
        });

        res.json(nombres)

    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
}

export const tiempoDeCategoria = async (req: Request, res: Response) => {
    try {
        const { id_categoria } = req.query;

        const resultado = await Tarea.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('tiempo')), 'tiempo']
            ],
            where: {
                id_categoria: id_categoria
            }
        });

        res.json(resultado?.dataValues?.tiempo || 0 );

    } catch (error) {
        res.status(500).json({ error: 'Error al calcular el tiempo de la categoría' });
    }
}

export const tiempoDeTarea = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.query;

        const resultado = await Tarea.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('tiempo')), 'tiempo']
            ],
            where: {
                nombre: nombre
            }
        });

        res.json(resultado);

    } catch (error) {
        res.status(500).json({ error: 'Error al calcular el tiempo de la categoría' });
    }
}