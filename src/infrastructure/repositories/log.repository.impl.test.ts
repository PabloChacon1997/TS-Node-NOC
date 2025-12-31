import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { LogRepositoryImpl } from './log.repository.impl';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('LogRepositoryImpl', () => {
  const mockLogDatasoruce = {
    saveLog: jest.fn((log: LogEntity) => Promise.resolve()),
    getLogs: jest.fn((severityLevel: LogSeverityLevel) => Promise.resolve([])),
  }
  const logRepository = new LogRepositoryImpl(mockLogDatasoruce);
  beforeEach(() => {
    jest.clearAllMocks();
  })
  test('saveLog should call datasource with arguments', async () => {
    const log = { level: LogSeverityLevel.high, message: 'hola' } as LogEntity
    await logRepository.saveLog(log);
    expect(mockLogDatasoruce.saveLog).toHaveBeenCalledWith(log);
  });
  test('getLogs should call datasource with arguments', async () => {
    await logRepository.getLogs(LogSeverityLevel.low);
    expect(mockLogDatasoruce.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)
  });
})