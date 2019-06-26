import { Router } from 'express';
import contact from './contact';
import sms from './sms';

const route = Router();

route.use('/contacts', contact);
route.use('/sms', sms);

export default route;
