import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdPersonAdd, MdPerson, MdLock } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { login } from '~/local/auth';

import { Container } from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const history = useHistory();

  function handleTryLogin(e) {
    e.preventDefault();

    async function tryLogin() {
      try {
        const resPersonage = await api.post('/login', {
          email,
          password,
        });

        toast.info('Bem vindo');
        login(resPersonage.data.token);
        window.location.reload(false);
        history.push('/');
      } catch (error) {
        setpassword('');
        toast.error('Email ou senha inválido!');
      }
    }

    tryLogin();
  }

  return (
    <Container>
      {/* <img src={Logo} alt="Logo" /> */}

      <form>
        <strong>Acessar</strong>

        <div className="divInput">
          <MdPerson />
          <input
            email="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="divInput">
          <MdLock />
          <input
            type="password"
            email="password"
            id="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <button type="submit" onClick={handleTryLogin}>
          Entrar
        </button>

        <Link to="/user">
          <MdPersonAdd className="left-icons" />
          Cadastrar
        </Link>
      </form>
    </Container>
  );
}
