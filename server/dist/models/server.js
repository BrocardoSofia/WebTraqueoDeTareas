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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const categoria_1 = __importDefault(require("../routes/categoria"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const tarea_1 = __importDefault(require("../routes/tarea"));
const localizacion_1 = __importDefault(require("../routes/localizacion"));
const temporizador_1 = __importDefault(require("../routes/temporizador"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midleWares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        this.app.use('/api/usuarios', usuario_1.default);
        this.app.use('/api/categorias', categoria_1.default);
        this.app.use('/api/tareas', tarea_1.default);
        this.app.use('/api/localizacion', localizacion_1.default);
        this.app.use('/api/temporizadores', temporizador_1.default);
    }
    midleWares() {
        //parseamos el body
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.log(error);
                console.log('Error al conectarse a la base de datos');
            }
        });
    }
}
exports.default = Server;
