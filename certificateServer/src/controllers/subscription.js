import { v4 as uuid } from 'uuid';
import { Types } from 'mongoose';
import PDFDocument from 'pdfkit';
import { parseISO, format } from 'date-fns';
import Subscription from '~/database/models/Subscription';
import User from '~/database/models/User';
import Event from '~/database/models/Event';
import Mail from '../lib/Mail';

async function generateCertificate(req, res) {
  const { subscriptionId } = req.params;

  if (!Types.ObjectId.isValid(subscriptionId))
    return res.status(404).json({ error: 'Invalid subscription id' });

  const subscription = await Subscription.findOne({ _id: subscriptionId });

  if (!subscription)
    return res.status(404).json({ error: 'Subscription not found' });

  if (!subscription.checked)
    return res.status(400).json({ error: 'Check-in não realizado' });

  if (!subscription.certificate_code) {
    subscription.certificate_code = uuid();
    subscription.save();
  }

  const user = await User.findById(subscription.user_id);
  const event = await Event.findById(subscription.event_id);

  Mail.sendMail(
    `${user.name} <${user.email}>`,
    'Certificado Gerado',
    `Certificado gerado com sucesso para o evento "${
      event.name
    }" realizado em: ${format(event.date, 'dd/MM/yyyy hh:mm:ss Z')}.`,
    {
      link: `${process.env.APP_URL}/pdf/${subscription.certificate_code}`,
    }
  );

  return res.status(200).json(subscription);
}

async function verifyCertificate(req, res) {
  const { certificateCode } = req.params;

  const subscription = await Subscription.findOne({
    certificate_code: certificateCode,
  });

  if (!subscription)
    return res.status(404).json({ error: 'Certificado não encontrado' });

  return res.status(200).json(subscription);
}

async function pdfCertificate(req, res) {
  const { certificateCode } = req.params;

  const subscription = await Subscription.findOne({
    certificate_code: certificateCode,
  });

  if (!subscription)
    return res.status(404).json({ error: 'Certificado não encontrado' });

  const user = await User.findById(subscription.user_id);
  const event = await Event.findById(subscription.event_id);

  const pdf = new PDFDocument({ bufferPages: true });

  const buffers = [];
  pdf.on('data', buffers.push.bind(buffers));
  pdf.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        // 'Content-disposition': 'attachment;filename=test.pdf',
      })
      .end(pdfData);
  });

  pdf.font('Times-Roman').fontSize(22).text('Certificado', { align: 'center' });
  pdf.moveDown();
  pdf.moveDown();
  pdf
    .fontSize(12)
    .font('Times-Roman')
    .text(
      `Certificamos que ${user.name} portador do ` +
        `CPF: ${user.cpf} participou do evento `,
      { continued: true }
    )
    .font('Times-Bold')
    .text(event.name, { continued: true })
    .font('Times-Roman')
    .text(
      ` realizado no dia ${format(event.date, 'dd/MM/yyyy')} às ${format(
        event.date,
        'hh:mm:ss'
      )}.`
    );

  pdf.moveDown();
  pdf.moveDown();
  pdf
    .fontSize(10)
    .font('Times-Bold')
    .text('Código de Verificação: ', { continued: true })
    .font('Times-Roman')
    .text(subscription.certificate_code);

  pdf.end();
}

export default {
  generateCertificate,
  verifyCertificate,
  pdfCertificate,
};
