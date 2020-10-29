import { Router } from 'express';

const routes = new Router();

import authMiddleware from './middlewares/auth';

routes.use(authMiddleware);

export default routes;