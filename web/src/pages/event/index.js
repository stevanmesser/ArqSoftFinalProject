import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import {
  MdAssignmentTurnedIn,
  MdAssignmentReturned,
  MdCardMembership,
  MdPictureAsPdf,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { getUserLS } from '~/local/user';
import { Container } from './styles';

export default function Event() {
  const [user] = useState(getUserLS() || {});
  const [events, setEvents] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  const history = useHistory();

  async function loadEvents() {
    const actEvents =
      (await api(process.env.REACT_APP_EVENT_URL).get('/events')).data || [];

    const subs =
      (await api(process.env.REACT_APP_EVENT_URL).get('/subscriptions/owns'))
        .data || [];

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

    if (!user.email || !user.name) {
      history.push('/user');
    } else {
      load();
    }
  }, []);

  async function doAddEvent(e) {
    e.preventDefault();

    const event = await api(process.env.REACT_APP_EVENT_URL).post('/events', {
      name: newEvent,
      date: newEventDate,
    });
    loadEvents();
  }

  async function doSubscribe(e, id) {
    e.preventDefault();

    const res = (
      await api(process.env.REACT_APP_EVENT_URL).post(`/subscriptions/${id}`)
    ).data;

    if (res.ok) {
      toast.success('Subscribed');
    } else {
      toast.error(res.message);
    }

    loadEvents();
  }

  async function doUnSubscribe(e, id) {
    e.preventDefault();

    if (events.find(({ _id }) => _id === id).subscription.checked) {
      return;
    }

    const res = (
      await api(process.env.REACT_APP_EVENT_URL).delete(`/subscriptions/${id}`)
    ).data;

    if (res.ok) {
      toast.success('Unsubscribed');
    } else {
      toast.error(res.message);
    }

    loadEvents();
  }

  async function generateCertificate(e, id) {
    e.preventDefault();

    try {
      const res = (
        await api(process.env.REACT_APP_CERTIFICATE_URL).post(`/generate/${id}`)
      ).data;

      window.alert(res.certificate_code);
      toast.success('Generated certificate');
      loadEvents();
    } catch (error) {
      toast.error('Error on generate certificate');
    }
  }

  async function generatePDF(e, id) {
    e.preventDefault();
    const url = process.env.REACT_APP_CERTIFICATE_URL;
    window.open(`${url}/pdf/${id}`);
  }

  return (
    <Container>
      <strong>Events and subscriptions</strong>

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
            {event.subscription?.certificate_code && (
              <MdPictureAsPdf
                onClick={(e) =>
                  generatePDF(e, event.subscription.certificate_code)
                }
              />
            )}
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
            <label htmlFor="teste" className="event-date">
              {format(new Date(event.date), 'dd/MM/yy hh:mm')}
            </label>
            <strong>{event.name}</strong>
          </li>
        ))}
      </ul>
    </Container>
  );
}
