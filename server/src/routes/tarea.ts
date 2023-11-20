import { Router } from 'express';
import { guardarTarea, obtenerNombresTareas, obtenerTareas } from '../controllers/tarea'; 

const router = Router ();

router.post('/',guardarTarea) //recibe un body
router.get('/',obtenerTareas) // recibe una query
router.get('/nombres',obtenerNombresTareas) // recibe una query

export default router;