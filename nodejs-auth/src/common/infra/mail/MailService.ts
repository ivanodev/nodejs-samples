export interface TemplateParams {
  paramName: string;
  paramValue: string;
}

export interface Attachment {
  filename: string;
  path: string;
  cid: string;
  contentDisposition: 'attachment' | 'inline' | undefined;
}

interface MailService {

  sendEmail(
    emailTo: string, subject: string, templatePath: string, templateParams: TemplateParams[], attachments: Attachment[]): Promise<any>;

}

export default MailService;