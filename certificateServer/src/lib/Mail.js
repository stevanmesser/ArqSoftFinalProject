import axios from 'axios';

const mailApi = axios.create({
  baseURL: process.env.MAIL_SERVICE_URL,
});

export default {
  async sendMail(to, subject, message, extra) {
    await mailApi.post('/sendMail', { to, subject, message, ...extra });
  },
};
