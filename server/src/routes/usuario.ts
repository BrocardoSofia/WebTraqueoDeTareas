import { Router } from 'express';
import { existeEmail,login,modificarClave,obtenerUsuario,registrarUsuario, verificarClave,modificarEmail, modificarNombre } from '../controllers/usuario';

const router = Router();

router.get('/verificar-email',existeEmail) //recibe query
router.post('/registrar-usuario',registrarUsuario) //recibe body
router.get('/login',login) //recibe query
router.get('/:id',obtenerUsuario) //recibe params
router.get('/verificar-clave/:id',verificarClave) //recibe params y query
router.put('/modificar-clave/:id',modificarClave)//recibe params y body
router.put('/modificar-email/:id',modificarEmail)//recibe params y body
router.put('/modificar-nombre/:id',modificarNombre)//recibe params y body


export default router;