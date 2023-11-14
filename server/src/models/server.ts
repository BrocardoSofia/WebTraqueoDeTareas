import express, {Application, Request,Response} from 'express'; 
import routesCategoria from '../routes/categoria';

class Server{

    private app : Application;
    private port : string;


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001'
        this.listen()
        this.routes()
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
        this.app.use('/api/categorias',routesCategoria)
    }

}

export default Server;