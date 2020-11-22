import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdPersonAdd, MdPerson, MdLock } from 'react-icons/md';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { login } from '~/local/auth';

import { Container } from './styles';

export default function Login() {
  const [cpf, setCPF] = useState('');
  const [password, setpassword] = useState('');

  const history = useHistory();

  function handleTryLogin(e) {
    e.preventDefault();

    async function tryLogin() {
      try {
        const resPersonage = await api(process.env.REACT_APP_USER_URL).post(
          '/login',
          {
            cpf,
            password,
          }
        );

        if (resPersonage.data.ok) {
          toast.info('Bem vindo');
          login(resPersonage.data.token);
          window.location.reload(false);
          history.push('/');
        } else {
          toast.error(resPersonage.data.error);
        }
      } catch (error) {
        toast.error('CPF ou senha inválido!');
      }
      setpassword('');
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
          <InputMask
            name="cpf"
            id="cpf"
            placeholder="CPF"
            mask="999.999.999-99"
            required
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
        </div>

        <div className="divInput">
          <MdLock />
          <input
            type="password"
            cpf="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <button type="submit" onClick={handleTryLogin}>
          Entrar
        </button>
      </form>
    </Container>
  );
}
