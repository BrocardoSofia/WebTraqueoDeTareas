import { Router } from 'express';
import { eliminarLocalizacion, guardarLocalizacion, modificarLocalizacion } from '../controllers/localizacion';

const router = Router();

router.post('/',guardarLocalizacion) //recibe body
router.put('/:id_usuario',modificarLocalizacion) // recibe params y body
router.delete('/',eliminarLocalizacion) //recibe query

export default router;