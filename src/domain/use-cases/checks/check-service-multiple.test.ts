import { describe, test, expect, jest } from '@jest/globals';
import { LogEntity } from '../../entities/log.entity';
import { beforeEach } from 'node:test';
import { CheckServiceMultiple } from './check-service-multiple';

describe('ChechkService UseCase', () => {
  const mockRepo1 = {
    saveLog: jest.fn((log: LogEntity) => Promise.resolve()),
    getLogs: jest.fn(() => Promise.resolve([])),
  }
  const mockRepo2 = {
    saveLog: jest.fn((log: LogEntity) => Promise.resolve()),
    getLogs: jest.fn(() => Promise.resolve([])),
  }
  const mockRepo3 = {
    saveLog: jest.fn((log: LogEntity) => Promise.resolve()),
    getLogs: jest.fn(() => Promise.resolve([])),
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  const checkService = new CheckServiceMultiple(
    [mockRepo1, mockRepo2, mockRepo3],
    successCallback,
    errorCallback,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call successCallback when fetch return true', async () => {
    const wasOk = await checkService.execute('https://google.com');
    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
  
  test('should call errorCallback when fetch return false', async () => {
    const wasOk = await checkService.execute('https://googledsvfvfv.com');
    expect(wasOk).toBe(false);
    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
