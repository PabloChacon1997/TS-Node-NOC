import { describe, test, expect, jest } from '@jest/globals';
import { LogEntity, LogSeverityLevel } from './log.entity';

describe('LogEntity', () => {
  const dataObj = {
    message: 'Hola Mundo',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts'
  }
  test('should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  })
  test('should create a LogEntity instance from Json', () => {
    const json = `{"level":"low","message":"Service https://google.com working","createdAt":"2025-12-26T18:05:50.775Z","origin":"check-service.ts"}`;
    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Service https://google.com working");
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  })
  test('should create a LogEntity instance from Object', () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  })
})