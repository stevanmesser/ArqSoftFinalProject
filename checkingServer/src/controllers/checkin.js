import { format } from 'date-fns';
import Subscription from '~/database/models/Subscription';
import Event from '~/database/models/Event';
import User from '~/database/models/User';

import Mail from '../lib/Mail';

async function checkin(req, res) {
  const { userId } = req.userId;
  const { id } = req.params;

  const user = await User.findById(userId);
  const event = await Event.findById(id);

  await Subscription.findOneAndUpdate(
    {
      event_id: id,
      user_id: userId,
    },
    { checked: true }
  );

  Mail.sendMail(
    `${user.name} <${user.email}>`,
    'Checkin Efetuado',
    `Checkin efetuado com sucesso para o evento "${
      event.name
    }" realizado em: ${format(event.date, 'dd/MM/yyyy hh:mm:ss')}.`
  );

  return res.json({ ok: true });
}

export default {
  checkin,
};
