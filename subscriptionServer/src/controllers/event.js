import Event from '~/database/models/Event';

async function create(req, res) {
  const event = await Event.create(req.body);

  return res.json(event);
}

async function getList(req, res) {
  const events = await Event.find();

  return res.json(events);
}

export default {
  create,
  getList,
};
