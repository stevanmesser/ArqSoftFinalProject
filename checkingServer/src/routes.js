import { Router } from 'express';

// import authMiddleware from '~/middlewares/auth';
import checkinCtl from './controllers/checkin';

const routes = new Router();

// routes.use(authMiddleware);

routes.use('/checkin/:id', checkinCtl.checkin);

routes.use('/subscribecheckin/:id', checkinCtl.subscribeAndCheckin);

export default routes;
