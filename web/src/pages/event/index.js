import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdAssignmentTurnedIn,
  MdAssignmentReturned,
  MdCardMembership,
  MdPictureAsPdf,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { api4 } from '~/services/api';

import { getUserLS } from '~/local/user';
import { Container } from './styles';

export default function Event() {
  const [user] = useState(getUserLS() || {});
  const [events, setEvents] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  async function loadEvents() {
    const actEvents = (await api4.get('/events')).data || [];

    const subs = (await api4.get('/subscriptions/owns')).data || [];

    setEvents(
      actEvents.map((event) => ({
        ...event,
        subscription: subs.find(({ event_id }) => event_id === event._id),
      }))
    );

    setSubscriptions(subs);
  }

  useEffect(() => {
    async function load() {
      await loadEvents();
    }
    load();
  }, []);

  async function doAddEvent(e) {
    e.preventDefault();

    const event = await api4.post('/events', {
      name: newEvent,
      date: newEventDate,
    });
    loadEvents();
  }

  async function doSubscribe(e, id) {
    e.preventDefault();

    const res = (await api4.post(`/subscriptions/${id}`)).data;

    if (res.ok) {
      toast.success('Subscribed');
    } else {
      toast.error(res.message);
    }

    loadEvents();
  }

  async function doUnSubscribe(e, id) {
    e.preventDefault();

    const res = (await api4.delete(`/subscriptions/${id}`)).data;

    if (res.ok) {
      toast.success('Unsubscribed');
    } else {
      toast.error(res.message);
    }

    loadEvents();
  }

  async function generateCertificate(e, id) {
    e.preventDefault();

    const res = (await api4.delete(`/generate/${id}`)).data;

    if (res.ok) {
      toast.success('Generated Certificate');
    } else {
      toast.error(res.message);
    }
  }

  async function generatePDF(e, id) {
    e.preventDefault();

    const res = (await api4.delete(`/pdf/${id}`)).data;

    if (res.ok) {
      toast.success('Generated PDF');
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Container>
      <div className="menu">
        <Link className="link" to="/user">
          Perfil
        </Link>
      </div>

      {user.admin && (
        <div>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Name"
          />
          <input
            type="datetime"
            name="date"
            id="newEventDate"
            value={newEventDate}
            onChange={(e) => setNewEventDate(e.target.value)}
            placeholder="Date"
          />
          <button type="submit" onClick={doAddEvent}>
            Adicionar Evento
          </button>
        </div>
      )}

      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.subscription?.certificate_code &&
              <MdPictureAsPdf onClick={e => generatePDF(e, event.subscription.certificate_code)} />}
            {event.subscription?.checked && (
              <MdCardMembership
                onClick={(e) => generateCertificate(e, event.subscription._id)}
              />
            )}
            {event.subscription ? (
              <MdAssignmentTurnedIn
                onClick={(e) => doUnSubscribe(e, event._id)}
              />
            ) : (
              <MdAssignmentReturned
                onClick={(e) => doSubscribe(e, event._id)}
              />
            )}
            <strong>{event.name}</strong>
          </li>
        ))}
      </ul>
    </Container>
  );
}
