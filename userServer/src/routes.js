import { Router } from 'express';

import userCtl from '~/controllers/user';

import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/login', userCtl.login);

routes.post('/users', userCtl.create);

routes.use(authMiddleware);

routes.put('/users', userCtl.update);
routes.get('/users/own', userCtl.getOwn);

export default routes;
