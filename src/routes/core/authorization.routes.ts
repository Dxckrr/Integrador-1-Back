import { Router } from "express";
import { getAuthorizationById, updateAuthorization } from "../../controllers/authorization.controller"
const router: Router = Router();

router
    .get('/id/:id', getAuthorizationById)
    .put('/update/:id', updateAuthorization)

export default router;