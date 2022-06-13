import MailService from "./MailService";
import MailServiceMailTrap from "./MailServiceMailTrap";
import MailServiceGMail from "./MailServiceGMail";
import MailServiceHotMail from "./MailServiceHotMail";

export enum MailServiceType {
  mailtrap = 0,
  hotmail = 1,
  gmail = 2
}

export default class MailServiceFactory {

  public static createMailService(mailServiceType: MailServiceType = MailServiceType.mailtrap): MailService {

    switch (mailServiceType) {
      case MailServiceType.mailtrap: return new MailServiceMailTrap();
      case MailServiceType.hotmail: return new MailServiceHotMail();
      case MailServiceType.gmail: return new MailServiceGMail();
    }
  }
}