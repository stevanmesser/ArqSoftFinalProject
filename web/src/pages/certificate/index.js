/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { Container } from './styles';

function Certificate() {
  const [certificateSerial, setCertificateSerial] = useState('');

  async function doCheckCertificate(e) {
    e.preventDefault();

    try {
      const res = (
        await api(process.env.REACT_APP_CERTIFICATE_URL).get(
          `/verify/${certificateSerial}`
        )
      ).data;

      const url = process.env.REACT_APP_CERTIFICATE_URL;
      window.open(`${url}/pdf/${res.certificate_code}`);
    } catch (error) {
      toast.error('Invalid certificate serial');
    }
  }

  return (
    <Container>
      <input
        type="text"
        placeholder="Certificate number"
        value={certificateSerial}
        onChange={(e) => setCertificateSerial(e.target.value)}
      />

      <button type="submit" onClick={doCheckCertificate}>
        Verify
      </button>
    </Container>
  );
}

export default Certificate;
