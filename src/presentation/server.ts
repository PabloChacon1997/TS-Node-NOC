import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/mail.service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource);

const emailService = new EmailService();

export class Server {

  public static start() {
    console.log('Server started...')

    // Mandar email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository,
    // ).execute(['pablo.andres.chacon@outlook.com', 'actdck@gmail.com']);
    // emailService.sendEmailWithFileSysytemLogs(['pablo.andres.chacon@outlook.com', 'actdck@gmail.com']);
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';
    //     // const url = 'http://localhost:3000';
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error)
    //     ).execute(`${url}`);
    //   }
    // );
  }

}
