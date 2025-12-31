import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[] 
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private trasnporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sendInformation = await this.trasnporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      });
      // console.log(sendInformation);
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent',
        origin: 'email.service.ts'
      });

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email not sent',
        origin: 'email.service.ts'
      });
      return false;
    }
  }

  async sendEmailWithFileSysytemLogs(to: string | string[]) {
    const subject = 'Logs del servidor';
    const htmlBody = `
    <h3>Logs de sistema NOC</h3>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
    <p>
      Ver Logs adjuntos
    </p>
    `;

    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log', path: './logs/logs-all.log'
      },
      {
        filename: 'logs-medium.log', path: './logs/logs-medium.log'
      },
      {
        filename: 'logs-high.log', path: './logs/logs-high.log'
      },
    ]

    return await this.sendEmail({to, subject, htmlBody, attachments});
  }
}