import { Router } from 'express';
import { createHistoriaMedicaController, getMedicalHistory,   } from '../../controllers/medicalHistory.controller';

const router: Router = Router();

router
    .post('/create', createHistoriaMedicaController)
    .get('/:id', getMedicalHistory);


export default router;
