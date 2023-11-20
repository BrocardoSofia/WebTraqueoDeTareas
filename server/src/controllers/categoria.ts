import { Request, Response } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
import Categoria from '../models/categoria';

export const existeCategoria = async (req: Request, res: Response) => {
    try {
        const { id_usuario, nombre } = req.query;

        const consulta =
            `SELECT 1 FROM Categorias 
            WHERE id_usuario = :id_usuario AND nombre = :nombre`;

        const result = await sequelize.query(consulta, {
            replacements: { id_usuario, nombre },
            type: QueryTypes.SELECT,
        });

        if (result.length != 0) {
            res.json({ respuesta: true, msg: 'La categoria ya existe en la base de datos' });
        } else {
            res.json({ respuesta: false, msg: 'La categoria no existe en la base de datos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
}

export const agregarCategoria = async (req: Request, res: Response) => {
    //usar existe categoria  antes de llamar
    try {
        const { id_usuario, nombre } = req.body

        const consulta =
            `INSERT INTO Categorias (id_usuario,nombre) 
                VALUES (:id_usuario,:nombre)`;

        const result = await sequelize.query(consulta, {
            replacements: { id_usuario, nombre },
            type: QueryTypes.INSERT,
        });

        if (result[1] > 0) {
            res.json({ msg: 'La categoria fue agregada con exito' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la categoria' })
    }
}

export const modificarCategoria = async (req: Request, res: Response) => {
    //usar existe categoria  antes de llamar
    try {
        const { nombre } = req.body
        const { id_categoria } = req.params

        const consulta =
            `UPDATE Categorias
            SET nombre = :nombre
            WHERE id_categoria = :id_categoria`;

        const result = await sequelize.query(consulta, {
            replacements: { nombre, id_categoria },
            type: QueryTypes.UPDATE,
        });

        if (result[1] > 0) {
            res.json({ msg: 'La categoria fue modificada con exito' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la categoria' })
    }
}

export const obtenerCategorias = async (req: Request, res: Response) => {
    try {
        const { id_usuario } = req.query;

        const categorias = await Categoria.findAll({
            where : {
                id_usuario : id_usuario
            }
        });

        res.json(categorias)

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categorias' });
    }
}

export const eliminarCategoria = async (req: Request, res: Response) => {

    //usar verificar contrasenia de usuario antes de llamar 
    try {
        const { id_categoria } = req.query;

        const consulta =
            `DELETE FROM Tareas
            WHERE id_categoria = :id_categoria`;

        const result = await sequelize.query(consulta, {
            replacements: { id_categoria },
            type: QueryTypes.DELETE,
        });

        const consulta2 =
            `DELETE FROM Categorias
            WHERE id_categoria = :id_categoria`;

        const result2 = await sequelize.query(consulta2, {
            replacements: { id_categoria },
            type: QueryTypes.DELETE,
        });

        res.json({msg : 'Categoria eliminada correctamente'})

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoria' });
    }
}
