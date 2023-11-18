"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoria = exports.postCategoria = exports.deleteCategoria = exports.getCategoria = exports.getCategorias = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCategorias = yield categoria_1.default.findAll();
    res.json(listCategorias);
});
exports.getCategorias = getCategorias;
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findByPk(id);
    if (categoria) {
        res.json(categoria);
    }
    else {
        res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        });
    }
});
exports.getCategoria = getCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findByPk(id);
    if (!categoria) {
        res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        });
    }
    else {
        yield categoria.destroy();
        res.json({
            msg: `La categoria fue eliminada con exito`
        });
    }
});
exports.deleteCategoria = deleteCategoria;
const postCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield categoria_1.default.create(body);
        res.json({
            msg: `La categoria fue agregada con exito`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups ha ocurrido un error, comuniquese con soporte`
        });
    }
});
exports.postCategoria = postCategoria;
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const categoria = yield categoria_1.default.findByPk(id);
        if (categoria) {
            yield categoria.update(body);
            res.json({
                msg: `La categoria fue actualizada con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe la categoria con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups ha ocurrido un error, comuniquese con soporte`
        });
    }
});
exports.updateCategoria = updateCategoria;
