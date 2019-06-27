import { Router } from 'express';
import contact from './contact';
import sms from './sms';
import auth from './auth';
import authenticate from '../middlewares/authenticate';

const route = Router();

route.use('/contacts', authenticate, contact);
route.use('/sms', authenticate, sms);
route.use('/auth', auth);

export default route;
