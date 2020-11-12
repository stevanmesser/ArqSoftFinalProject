import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { api6 } from '../../services/api';
import { Container } from './styles';

export default function Checkin() {
  const [eventId, setEventId] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    toast.info(eventId);
    toast.info(user);
  }, []);

  return (
    <Container>
      <form>
        <input
          type="password"
          placeholder="Secret Event ID"
          onChange={(e) => setEventId(e.target.value)}
        />

        <strong>User</strong>
        <input
          placeholder="CPF or Phone or Email"
          onChange={(e) => setUser(e.target.value)}
        />
      </form>

      <Link to="/user" className="link">
        Speed Register User
      </Link>
    </Container>
  );
}
