
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDtasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cront-service";

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDtasource()
);
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

// const emailService = new EmailService();

export class Server {

  public static async start() {
    console.log('Server started...')

    // Mandar email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository,
    // ).execute(['pablo.andres.chacon@outlook.com', 'actdck@gmail.com']);
    // emailService.sendEmailWithFileSysytemLogs(['pablo.andres.chacon@outlook.com', 'actdck@gmail.com']);
    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
        // const url = 'http://localhost:3000';
        new CheckServiceMultiple(
          [fsLogRepository, postgresLogRepository, mongoLogRepository],
          () => console.log(`${url} is ok`),
          (error) => console.log(error)
        ).execute(`${url}`);
      }
    );
  }

}
