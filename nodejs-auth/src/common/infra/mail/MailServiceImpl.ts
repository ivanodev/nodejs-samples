import AppError from '@common/errors/app-error';
import fs from 'fs';
import { Transporter } from 'nodemailer';
import MailService, { Attachment, TemplateParams } from './MailService';

class MailServiceMailImpl implements MailService {

  private transport: Transporter;

  constructor(transport: Transporter) {

    this.transport = transport;
  }

  public async sendEmail(emailTo: string, subject: string, templatePath: string, templateParams: TemplateParams[], attachments: Attachment[]): Promise<any> {

    try {

      let htmlParsed: string = '';

      const data = await fs.promises.readFile(templatePath, 'utf-8');

      if (data && templateParams) {

         htmlParsed = data;

        templateParams.forEach(param => {

          const paramId = `{{@${param.paramName}}}`;

          htmlParsed = htmlParsed.replace(new RegExp(`${paramId}`), param.paramValue);
        });
      }

      return await this.transport.sendMail({
        from: 'Alpalytics - Portal Analytics <servico_smtp@alpargatas.com.br>',
        to: emailTo,
        subject,
        html: htmlParsed,
        attachments: attachments,
        encoding: 'utf8',
      });

    } catch (err) {

      throw new AppError('Sending mail ' + err, 500);
    }
  }

}

export default MailServiceMailImpl;
