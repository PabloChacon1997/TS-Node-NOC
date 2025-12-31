import { describe, test, expect, jest, afterAll, beforeAll } from '@jest/globals';
import { LogDatasource } from './log.datasource';
import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

describe('log.datasource.ts', () => {

  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'Test message',
    level: LogSeverityLevel.high
  })

  class MockLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }

  }
  test('should test the abstract class', async() => {
    const mockLogDatsource = new MockLogDatasource();
    expect(mockLogDatsource).toBeInstanceOf(MockLogDatasource);
    expect(mockLogDatsource).toHaveProperty('saveLog');
    expect(mockLogDatsource).toHaveProperty('getLogs');

    // await mockLogDatsource.saveLog(newLog);
    const logs = await mockLogDatsource.getLogs(LogSeverityLevel.high);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);

  })
})