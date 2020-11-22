/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';

import api from '../../services/api';
import { Container } from './styles';

const tryLater = [];

function checkin(eventId, actCpf) {
  return api(process.env.REACT_APP_CHECKIN_URL).post(`/checkin/${eventId}`, {
    cpf: actCpf,
  });
}

function subscribe(eventId, actCpf) {
  return api(
    process.env.REACT_APP_CHECKIN_URL
  ).post(`/subscribecheckin/${eventId}`, { cpf: actCpf });
}

function create(actCpf) {
  return api(process.env.REACT_APP_USER_URL).post('/users', {
    cpf: actCpf,
  });
}

async function syncTrysLaters(eventId) {
  console.log('teste', tryLater);

  for (const key in tryLater) {
    try {
      const obj = tryLater[key];
      if (obj.method === 'checkin') {
        await checkin(eventId, obj.cpf);
      } else if (obj.method === 'subscribe') {
        await subscribe(eventId, obj.cpf);
      }
      if (obj.method === 'register') {
        await create(obj.cpf);
      }
      tryLater.splice(key);
    } catch (error) {
      console.log('error teste', String(error));
      if (String(error).includes('Network Error')) {
        break;
      }
    }
  }
}

export default function Checkin() {
  const [eventId, setEventId] = useState('5fa9cd04190ebb174033232a');
  const [cpf, setCPF] = useState('');

  useEffect(() => {
    setInterval(() => syncTrysLaters(eventId), 12000);
  }, []);

  async function doCheckin() {
    try {
      const response = await checkin(eventId, cpf);

      if (response.data.ok) {
        toast.info('Success check in');
        setCPF('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (String(error).includes('Network Error')) {
        tryLater.push({ method: 'checkin', cpf });
        toast.error('Network Off');
        setCPF('');
      } else {
        toast.error('Failed to make checkin');
      }
    }
  }

  async function doSubscribe() {
    try {
      const response = await subscribe(eventId, cpf);

      if (response.data.ok) {
        toast.info('Success subscription and check in');
        setCPF('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (String(error).includes('Network Error')) {
        tryLater.push({ method: 'subscribe', cpf });
        toast.error('Network Off');
        setCPF('');
      } else {
        toast.error('Failed to subscribe and make check in');
      }
    }
  }

  async function doRegister() {
    try {
      const response = await create(cpf);

      if (response.data.ok) {
        toast.info('Success register');
        doSubscribe();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (String(error).includes('Network Error')) {
        tryLater.push({ method: 'register', cpf });
        toast.error('Network Off');
        setCPF('');
      } else {
        toast.error('Failed to register');
      }
    }
  }

  return (
    <Container>
      <form>
        <strong>Secret Event ID</strong>
        <input
          type="password"
          placeholder="Secret Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        />

        <strong>CPF</strong>
        <InputMask
          placeholder="CPF"
          name="cpf"
          id="cpf"
          mask="999.999.999-99"
          value={cpf}
          onChange={(e) => setCPF(e.target.value)}
        />

        <div className="divButtons">
          <button type="button" onClick={doCheckin}>
            Check in
          </button>
          <button type="button" onClick={doSubscribe}>
            Subscribe
          </button>
          <button type="button" onClick={doRegister}>
            Create User
          </button>
        </div>
      </form>
    </Container>
  );
}
