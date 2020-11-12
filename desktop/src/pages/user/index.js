/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { FiArrowLeftCircle } from 'react-icons/fi';
import api from '../../services/api';

import { Container } from './styles';

export default function User() {
  const [user, setUser] = useState({});
  const history = useHistory();

  function handleSaveUser(e) {
    e.preventDefault();

    async function saveUser() {
      const { name, cpf, phone, email } = user;

      if (!name) {
        toast.error("Name it's necessary");
        return;
      }

      if (!cpf && !phone && !email) {
        toast.error('Necessary CPF or Phone or Email');
        return;
      }

      try {
        await api.post('/users', user);

        toast.success('Usuário criado');
        history.push('/checkin');
      } catch (error) {
        toast.error('Falha ao salvar o Perfil');
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
        <strong>Cadastro rápido</strong>

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
          <label htmlFor="cpf">CPF</label>
          <InputMask
            name="cnpj"
            id="cnpj"
            mask="99.999.999/9999-99"
            value={user.cpf || ''}
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

        <button type="submit" onClick={handleSaveUser}>
          Cadastrar
        </button>

        <Link to="/checkin">
          <FiArrowLeftCircle /> Cancelar
        </Link>
      </form>
    </Container>
  );
}
