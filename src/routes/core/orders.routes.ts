import { Router } from 'express';
import { 
    createOrdenMedicaController, 
    getOrdenMedicaByIdController,
    getAllOrdenesMedicasController,
    getOrdenesMedicasByUsuarioIdController, 
    
} from '../../controllers/order.controller';

const router: Router = Router();

router
    .post('/create', createOrdenMedicaController)        
    .get('/ordenes-medicas/:id', getOrdenMedicaByIdController) 
    .get('/', getAllOrdenesMedicasController)  
    .get('/ordenes-medicas-paciente/:id', getOrdenesMedicasByUsuarioIdController);         

export default router;
