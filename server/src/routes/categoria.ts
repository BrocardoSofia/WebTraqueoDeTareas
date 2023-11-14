import { Router } from 'express';
import { getCategorias, getCategoria, deleteCategoria } from '../controllers/categoria';

const router = Router ();

router.get('/',getCategorias)
router.get('/:id',getCategoria)
router.delete('/:id',deleteCategoria)


export default router;