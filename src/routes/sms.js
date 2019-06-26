import { Router } from 'express';
import Controller from '../controllers/sms';

const route = Router();

route.post('/', Controller.send);
route.get('/', Controller.getMany);
route.get('/:id', Controller.read);

export default route;
