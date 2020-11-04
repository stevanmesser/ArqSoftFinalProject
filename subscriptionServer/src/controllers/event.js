import Event from '~/database/models/Event'

async function getList(req, res) {
  const events = Event.find();

  return res.json(events);
}

export default {
  getList,
}
