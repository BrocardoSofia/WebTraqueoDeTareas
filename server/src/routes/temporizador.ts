import { Router } from 'express';
import { guardarTemporizador, modificarTemporizador, obtenerTemporizador } from '../controllers/temporizador'

const router = Router (); 

router.post('/',guardarTemporizador) //recibe body
router.put('/:id_usuario',modificarTemporizador) //recibe params y body 
router.get('/',obtenerTemporizador) //recibe query

export default router;