import { describe, test, expect, jest } from '@jest/globals';
import { SendEmailLogs } from './send-email-logs';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

describe('SendEmailLogs UseCase', () => {
  const mockEmailService = {
    sendEmailWithFileSysytemLogs: jest.fn().mockReturnValue(true),
  }
  const mockRepository = {
      saveLog: jest.fn((log: LogEntity) => Promise.resolve()),
      getLogs: jest.fn(() => Promise.resolve([])),
  }
  const sendEmailLog = new SendEmailLogs(
    mockEmailService as any,
    mockRepository

  );
  test('should call sendEmial and saveLog', async () => {
    
    const result = await sendEmailLog.execute('andres@google.com');
    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSysytemLogs).toHaveBeenCalledTimes(1);
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: LogSeverityLevel.high,
      message: "Log email sent",
      origin: "send-email-logs.ts"
    });
  })
});