import nodemailer, { Transporter } from 'nodemailer';
import AppError from '@common/errors/app-error';
import MailService from './MailService';
import MailServiceMailImpl from './MailServiceImpl';

class MailServiceGMail extends MailServiceMailImpl implements MailService {

  constructor() {

    // Necessário preencher as credenciais
    const transport = nodemailer.createTransport({
      service: 'gmail', 
      host: 'smtp.gmail.com',
      port: 587,
      name: '',
      auth: {
        user: '',
        pass: ''
      }
    });

    transport.verify(function (error, success) {

      if (error) {
        throw new AppError('Sending mail ' + error, 500);
      }
    });

    super(transport);
  }
}

export default MailServiceGMail;
