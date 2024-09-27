import { Router } from 'express';
import { 
    createOrdenMedicaController, 
    getOrdenMedicaByIdController,
    getAllOrdenesMedicasController 
} from '../../controllers/order.controller';

const router: Router = Router();

router
    .post('/create', createOrdenMedicaController)        
    .get('/ordenes-medicas/:id', getOrdenMedicaByIdController) 
    .get('/', getAllOrdenesMedicasController);                

export default router;
