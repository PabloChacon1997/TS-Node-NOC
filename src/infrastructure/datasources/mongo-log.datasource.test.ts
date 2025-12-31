import { describe, test, expect, jest, beforeAll, afterAll } from '@jest/globals';
import { MongoDatabase } from '../../data/mongo';
import { envs } from '../../config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { MongoLogDtasource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('Purebas en MongoLogDatasource', () => {
  const logDatsource = new MongoLogDtasource();
  beforeAll(async() => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });
  afterAll(() => {
    mongoose.connection.close();
  });
  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');


    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'Test message',
      origin: 'mongo-log.datasource.test.ts'
    });
    await logDatsource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Mongo log created", expect.any(String));
  })
  test('should get logs', async () => {
    
    const logs = await logDatsource.getLogs(LogSeverityLevel.high);
    expect(logs[logs.length-1]?.level).toBe(LogSeverityLevel.high)
  })
})