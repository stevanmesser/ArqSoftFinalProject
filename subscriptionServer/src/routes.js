import { Router } from 'express';

import subscriptionsCtl from '~/controllers/subscription';
import eventCtl from '~/controllers/event';

import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.get('/events', eventCtl.getList);

routes.use(authMiddleware);

routes.post('/events', eventCtl.create);

routes.post('/subscriptions/:id', subscriptionsCtl.create);
routes.get('/subscriptions/owns', subscriptionsCtl.getOwns);
routes.delete('/subscriptions/:id', subscriptionsCtl.delet);

export default routes;
