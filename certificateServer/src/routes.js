import { Router } from 'express';

import authMiddleware from '~/middlewares/auth';
import subscriptionCtl from './controllers/subscription';

const routes = new Router();

routes.get('/verify/:certificateCode', subscriptionCtl.verifyCertificate);
routes.get('/pdf/:certificateCode', subscriptionCtl.pdfCertificate);

routes.use(authMiddleware);

routes.post('/generate/:subscriptionId', subscriptionCtl.generateCertificate);

export default routes;
