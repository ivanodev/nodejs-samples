import nodemailer, { Transporter } from 'nodemailer';
import AppError from '@common/errors/app-error';
import MailService from './MailService';
import MailServiceMailImpl from './MailServiceImpl';

class MailServiceMailTrap extends MailServiceMailImpl implements MailService {

  constructor() {

    // Necessário preencher as credenciais
    // Mailtrap um portal de email fake - abra uma conta para obter as credencias
    // https://mailtrap.io/inboxes
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: '61088658e2c2bb',
        pass: 'c07f8506300b1a'
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

export default MailServiceMailTrap;
