import {Request, Response} from 'express';

export const getCategorias = (req : Request, res: Response) => {
    res.json({
        msg : 'get categorias'
    })
}

export const getCategoria = (req : Request, res: Response) => {
    const {id} = req.params;
    res.json({
        msg : 'get categoria',
        id
    })
}

export const deleteCategoria = (req : Request, res: Response) => {
    const {id} = req.params;
    res.json({
        msg : 'delete categoria',
        id
    })
}

