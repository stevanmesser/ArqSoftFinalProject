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
        let resUser;
        if (logado) {
          resUser = await api.put('/users', user);
          toast.success('Usuário salvo');
          setUserLS(resUser.data);
        } else {
          resUser = await api.post('/users', {
            ...user,
            newPassword: user.password,
          });
          toast.success('Usuário criado');
          history.push('/login');
        }
        setUser(resUser.data);
      } catch (error) {
        toast.error('Falha ao salvar o Perfil');
        console.log(error);
      }
    }

    saveUser();
  }

  function handleInputChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <Container>
      <form>
        <strong>{logado ? 'Perfil' : 'Cadastrar'}</strong>

        <div className="divInput">
          <label htmlFor="name">Nome</label>
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
          <label htmlFor="phone">Telefone</label>
          <InputMask
            name="phone"
            id="phone"
            mask="(99) 99999-9999"
            value={user.phone || ''}
            onChange={handleInputChange}
          />
        </div>

        {!logado && (
          <div className="divInput">
            <label htmlFor="password">Senha</label>
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
          {logado ? 'Salvar' : 'Cadastrar'}
        </button>

        {!logado ? (
          <Link to="/login">
            <FiArrowLeftCircle /> Já possuo cadastro
          </Link>
        ) : null}
      </form>
    </Container>
  );
}
