import { isAfter, subDays } from 'date-fns';
import Subscription from '~/database/models/Subscription';
import Event from '~/database/models/Event';

async function create(req, res) {
  const { id } = req.params;

  await Subscription.create({ user_id: req.userId, event_id: id });

  return res.json({ ok: true });
}

async function getOwns(req, res) {
  const subscriptions = await Subscription.find({ user_id: req.userId });

  return res.json(subscriptions);
}

async function delet(req, res) {
  const { id: event_id } = req.params;

  const event = await Event.findById(event_id);

  if (!event) {
    return res.json({ ok: false, message: "Event don't finded" });
  }

  const dateLimit = subDays(event.date, event.days_to_cancel);

  if (isAfter(new Date(), dateLimit)) {
    // validação de days to cancel
    return res.json({ ok: false, message: 'Date to cancel expired' });
  }

  await Subscription.deleteOne({ event_id, user_id: req.userId });

  return res.json({ ok: true });
}

export default {
  create,
  getOwns,
  delet,
};
