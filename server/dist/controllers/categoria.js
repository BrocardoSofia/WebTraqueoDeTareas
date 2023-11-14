"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoria = exports.getCategoria = exports.getCategorias = void 0;
const getCategorias = (req, res) => {
    res.json({
        msg: 'get categorias'
    });
};
exports.getCategorias = getCategorias;
const getCategoria = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'get categoria',
        id
    });
};
exports.getCategoria = getCategoria;
const deleteCategoria = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'delete categoria',
        id
    });
};
exports.deleteCategoria = deleteCategoria;
