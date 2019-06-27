import { Router } from 'express';
import controller from '../controllers/auth';

const route = Router();

route.post('/', controller.authenticate);

export default route;
