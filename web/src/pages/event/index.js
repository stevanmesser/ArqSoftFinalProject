import React, { useEffect, useState } from 'react';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { Container } from './styles';

export default function Event() {
  const [events, setEvents] = useState([]);

  useEffect(() => {}, []);

  return (
    <Container>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <MdAssignmentTurnedIn />
            <strong>{event.name}</strong>
          </li>
        ))}
      </ul>
    </Container>
  );
}
