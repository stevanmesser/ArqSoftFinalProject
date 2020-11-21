import Subscription from '~/database/models/Subscription';
import User from '~/database/models/User';

async function checkin(req, res) {
  // return res.status(502);
  const { id } = req.params;
  const { cpf } = req.body;

  const user = await User.findOne({ cpf });

  if (!user) {
    return res.json({ ok: false, message: 'User not found' });
  }

  await Subscription.findOneAndUpdate({
    event_id: id,
    user_id: user._id,
    checked: true,
  });

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
