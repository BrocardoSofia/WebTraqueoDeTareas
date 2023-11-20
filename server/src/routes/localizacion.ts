import { Router } from 'express';
import { eliminarLocalizacion, guardarLocalizacion, modificarLocalizacion, tieneLocalizacion } from '../controllers/localizacion';

const router = Router();

router.get('/',tieneLocalizacion)//recibe una query
router.post('/',guardarLocalizacion) //recibe body
router.put('/:id_usuario',modificarLocalizacion) // recibe params y body
router.delete('/',eliminarLocalizacion) //recibe query

export default router;