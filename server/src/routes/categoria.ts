import { Router } from 'express';
import { agregarCategoria, eliminarCategoria, existeCategoria, modificarCategoria, obtenerCategorias  } from '../controllers/categoria';


const router = Router ();

router.get('/existe-categoria',existeCategoria); //recibe query 
router.post('/agregar-categoria',agregarCategoria) //recibe body
router.put('/modificar-categoria/:id_categoria',modificarCategoria) //recibe params y body 
router.get('/',obtenerCategorias) //recibe query
router.delete('/',eliminarCategoria) //recibe query

export default router;