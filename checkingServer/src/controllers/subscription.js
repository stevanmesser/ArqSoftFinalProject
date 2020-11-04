import Subscription from '~/database/models/Subscription';

async function checkin(req, res) {
  const { userId } = req.userId;
  const { id } = req.params;

  await Subscription.findOneAndUpdate({
    event_id: id,
    user_id: userId,
    checked: true,
  });

  return res.json({ ok: true });
}

export default {
  checkin,
};
