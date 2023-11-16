import { Router } from 'express';
import { getCategorias, getCategoria, deleteCategoria, postCategoria, updateCategoria } from '../controllers/categoria';

const router = Router ();

router.get('/',getCategorias)
router.get('/:id',getCategoria)
router.delete('/:id',deleteCategoria)
router.post('/',postCategoria)
router.put('/:id',updateCategoria)

export default router;