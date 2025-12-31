import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { EmailService, SendMailOptions } from './mail.service';
import nodemailer from 'nodemailer';

describe('EmailService', () => {

  const emailService = new EmailService();
  test('should send email', async () => {

    const options: SendMailOptions = {
      to: 'andres@google.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>'
    }

    const emailSent = await emailService.sendEmail(options);
    expect(emailSent).toBeTruthy();
  });
});
