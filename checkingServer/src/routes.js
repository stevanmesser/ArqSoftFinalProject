import { Router } from 'express';

import authMiddleware from '~/middlewares/auth';
// import subscriptionCtl from './controllers/subscription';

const routes = new Router();

routes.use(authMiddleware);

export default routes;
