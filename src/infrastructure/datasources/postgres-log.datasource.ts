import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../config/plugins/envs.plugin";


const adapter = new PrismaPg({
  connectionString: envs.POSTGRES_URL!,
});

const prisma = new PrismaClient({adapter});

const severityEnum = {
  low: SeverityLevel.LOW,
  high: SeverityLevel.HIGH,
  medium: SeverityLevel.MEDIUM,
}

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = await prisma.logModel.create({
      data: {
        level: level,
        message: log.message,
        origin: log.origin
      }
    });

    console.log('Postgres log created', newLog);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const logs = await prisma.logModel.findMany({
      where: {
        level,
      },
      select: { message: true, origin: true, createdAt: true, level: true }
    });
    return logs.map(LogEntity.fromObject);
  }

}