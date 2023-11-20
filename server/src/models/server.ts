import express, {Application, Request,Response} from 'express'; 
import cors from 'cors';
import routesCategoria from '../routes/categoria';
import routesUsuario from '../routes/usuario';
import routesTarea from '../routes/tarea';
import routesLocalizacion from '../routes/localizacion'
import db from '../db/connection';

class Server{

    private app : Application;
    private port : string;


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001'
        this.listen()
        this.midleWares()
        this.routes()
        this.dbConnect()
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log(`aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    routes(){
        this.app.get('/',(req : Request, res : Response) => {
            res.json({
                msg : 'API Working'
            })
        })
        this.app.use('/api/usuarios',routesUsuario) 
        this.app.use('/api/categorias',routesCategoria) 
        this.app.use('/api/tareas',routesTarea) 
        this.app.use('/api/localizacion',routesLocalizacion) 
    }

    midleWares(){
        //parseamos el body
        this.app.use(express.json())

        //cors
        this.app.use(cors())
    }

    async dbConnect(){
        try{
            await db.authenticate()
            console.log('Base de datos conectada')

        }catch(error){
            console.log(error)
            console.log('Error al conectarse a la base de datos')
        }
    }

}

export default Server;