import { Request, Response } from 'express';
import Categoria from '../models/categoria';

export const getCategorias = async (req: Request, res: Response) => {
    const listCategorias = await Categoria.findAll()
    res.json(listCategorias)
}

export const getCategoria = async (req: Request, res: Response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id)

    if (categoria) {
        res.json(categoria)
    } else {
        res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        })
    }
}

export const deleteCategoria = async (req: Request, res: Response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id)

    if (!categoria) {
        res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        })
    } else {
        await categoria.destroy();
        res.json({
            msg: `La categoria fue eliminada con exito`
        })
    }
}

export const postCategoria = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        await Categoria.create(body);
        res.json({
            msg: `La categoria fue agregada con exito`
        })

    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ups ha ocurrido un error, comuniquese con soporte`
        })
    }

}

export const updateCategoria = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const categoria = await Categoria.findByPk(id);

        if (categoria) {
            await categoria.update(body);
            res.json({
                msg: `La categoria fue actualizada con exito`
            })
        } else {
            res.status(404).json({
                msg: `No existe la categoria con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ups ha ocurrido un error, comuniquese con soporte`
        })
    }
}

