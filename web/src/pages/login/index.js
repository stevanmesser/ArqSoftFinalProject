import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdPersonAdd, MdPerson, MdLock } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { login } from '~/local/auth';

import { Container } from './styles/Login';

export default function Login() {
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');

  const history = useHistory();

  function handleTryLogin(e) {
    e.preventDefault();

    async function tryLogin() {
      try {
        const resPersonage = await api.post('/login', {
          name,
          password,
        });

        // login(resPersonage.data.token);
        // window.location.reload(false);
        // history.push('/');
      } catch (error) {
        setpassword('');
        toast.error('Usuário ou senha inválido!');
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
            name="name"
            id="name"
            placeholder="Usuário"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className="divInput">
          <MdLock />
          <input
            type="password"
            name="password"
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

        <Link to="/register">
          <MdPersonAdd className="left-icons" />
          Cadastrar
        </Link>
      </form>
    </Container>
  );
}
