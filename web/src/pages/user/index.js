/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { FiArrowLeftCircle } from 'react-icons/fi';
import api from '~/services/api';
import { isAuthenticated } from '~/local/auth';
import { getUserLS, setUserLS } from '~/local/user';

import { Container } from './styles';

export default function User() {
  const [user, setUser] = useState(getUserLS() || {});
  const history = useHistory();
  const [logado] = useState(isAuthenticated());

  function handleSaveUser(e) {
    e.preventDefault();

    async function saveUser() {
      console.log(user);
      try {
        let response;
        if (logado) {
          response = (
            await api(process.env.REACT_APP_USER_PORT).put('/users', user)
          ).data;
          toast.success('User saved');
          setUserLS(response);
        } else {
          response = (
            await api(process.env.REACT_APP_USER_PORT).post('/users', {
              ...user,
              newPassword: user.password,
            })
          ).data;
          toast.success('User created');
          history.push('/login');
        }
        setUser(response);
      } catch (error) {
        toast.error('Falha ao salvar o Perfil');
        console.log(error);
      }
    }

    if (!user.name || !user.email || (user.needPassword && !user.password)) {
      toast.error('Name & email & password required');
    } else {
      saveUser();
    }
  }

  function handleInputChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <Container>
      <form>
        <strong>{logado ? 'Perfil' : 'Register'}</strong>

        <div className="divInput">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            required
            value={user.name || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="divInput">
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            id="email"
            required
            value={user.email || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="divInput">
          <label htmlFor="cpf">CPF</label>
          <InputMask
            name="cpf"
            id="cpf"
            mask="999.999.999-99"
            value={user.cpf || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="divInput">
          <label htmlFor="phone">Phone</label>
          <InputMask
            name="phone"
            id="phone"
            mask="(99) 99999-9999"
            value={user.phone || ''}
            onChange={handleInputChange}
          />
        </div>

        {(!logado || user.needPassword) && (
          <div className="divInput">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              required
              value={user.password || ''}
              onChange={handleInputChange}
            />
          </div>
        )}

        <button type="submit" onClick={handleSaveUser}>
          {logado ? 'Save' : 'Create'}
        </button>
      </form>
    </Container>
  );
}
