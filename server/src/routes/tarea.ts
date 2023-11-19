import { Router } from 'express';
import { obtenerTareas } from '../controllers/tarea'; 

const router = Router ();

router.get('/',obtenerTareas) // recibe una query