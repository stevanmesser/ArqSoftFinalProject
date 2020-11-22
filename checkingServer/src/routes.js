import { Router } from 'express';

// import authMiddleware from '~/middlewares/auth';
import checkinCtl from './controllers/checkin';

const routes = new Router();

// routes.use(authMiddleware);

routes.post('/checkin/:id', checkinCtl.checkin);

routes.post('/subscribecheckin/:id', checkinCtl.subscribeAndCheckin);

export default routes;
