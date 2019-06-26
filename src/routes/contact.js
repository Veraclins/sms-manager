import { Router } from 'express';
import Controller from '../controllers/contact';

const route = Router();

route.post('/', Controller.create);
route.get('/', Controller.getMany);
route.get('/:phoneNumber', Controller.getByPhoneNumber);
route.delete('/:phoneNumber', Controller.delete);

export default route;
