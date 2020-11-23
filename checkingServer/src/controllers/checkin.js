import { format } from 'date-fns';
import Subscription from '~/database/models/Subscription';
import Event from '~/database/models/Event';
import User from '~/database/models/User';

import Mail from '../lib/Mail';

async function checkin(req, res) {
  // return res.status(502);
  const { id } = req.params;
  const { cpf } = req.body;

  const user = await User.findOne({ cpf });
  const event = await Event.findById(id);

  if (!user) {
    return res.json({ ok: false, message: 'User not found' });
  }

  await Subscription.findOneAndUpdate({
    event_id: id,
    user_id: user._id,
    checked: true,
  });

  Mail.sendMail(
    `${user.name} <${user.email}>`,
    'Checkin Efetuado',
    `Checkin efetuado com sucesso para o evento "${
      event.name
    }" realizado em: ${format(event.date, 'dd/MM/yyyy hh:mm:ss zzzz')}.`
  );

  return res.json({ ok: true });
}

async function subscribeAndCheckin(req, res) {
  const { id } = req.params;
  const { cpf } = req.body;

  const user = await User.findOne({ cpf });

  if (!user) {
    return res.json({ ok: false, message: 'User not found' });
  }

  await Subscription.create({
    event_id: id,
    user_id: user._id,
    checked: true,
  });

  return res.json({ ok: true });
}

export default {
  checkin,
  subscribeAndCheckin,
};
