import { Router } from 'express';
import Mail from './lib/Mail';

const routes = new Router();

routes.post('/sendMail', async (req, res) => {
  const { to, subject, message, link } = req.body;
  await Mail.sendMail({
    to,
    subject,
    template: 'default',
    context: {
      message,
      link,
    },
  });
  return res.status(200).end();
});

export default routes;
