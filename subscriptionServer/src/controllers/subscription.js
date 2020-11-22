import { isAfter, subDays, format } from 'date-fns';
import Subscription from '~/database/models/Subscription';
import Event from '~/database/models/Event';
import User from '~/database/models/User';

import Mail from '../lib/Mail';

async function create(req, res) {
  const { id } = req.params;

  if (await Subscription.findOne({ user_id: req.userId, event_id: id })) {
    return res.json({ ok: false, message: 'Subscribed already' });
  }

  const user = await User.findById(req.userId);
  const event = await Event.findById(id);

  await Subscription.create({ user_id: req.userId, event_id: id });

  Mail.sendMail(
    `${user.name} <${user.email}>`,
    'Incrição Efetuada',
    `Inscrição efetuada com sucesso no evento "${
      event.name
    }" a se realizar em: ${format(event.date, 'dd/MM/yyyy hh:mm:ss Z')}.`
  );

  return res.json({ ok: true });
}

async function getOwns(req, res) {
  const subscriptions = await Subscription.find({ user_id: req.userId });

  return res.json(subscriptions);
}

async function delet(req, res) {
  const { id: event_id } = req.params;

  const user = await User.findById(req.userId);
  const event = await Event.findById(event_id);

  if (!event) {
    return res.json({ ok: false, message: 'Event not found' });
  }

  const dateLimit = subDays(event.date, event.days_to_cancel);

  if (isAfter(new Date(), dateLimit)) {
    // validação de days to cancel
    return res.json({ ok: false, message: 'Expired date to cancel' });
  }

  await Subscription.deleteOne({ event_id, user_id: req.userId });

  Mail.sendMail(
    `${user.name} <${user.email}>`,
    'Incrição Cancelada',
    `Sua inscrição foi cancelada para o evento "${
      event.name
    }" a se realizar em: ${format(event.date, 'dd/MM/yyyy hh:mm:ss Z')}.`
  );

  return res.json({ ok: true });
}

export default {
  create,
  getOwns,
  delet,
};
