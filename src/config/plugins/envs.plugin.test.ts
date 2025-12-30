import { describe, test, expect, jest } from '@jest/globals';
import { envs } from './envs.plugin';

describe('envs.plugin.ts', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'pabloandres120297@gmail.com',
      MAILER_SECRET_KEY: 'cjdzlrcnbufizlby',
      PROD: false,
      MONGO_URL: 'mongodb+srv://pabloandres120297_db_user:Hrf6zT77J6F1krpv@cluster0.onavoee.mongodb.net/',
      MONGO_DB_NAME: 'cluster0',
      MONGO_USER: 'pabloandres120297_db_user',
      MONGO_PASS: 'Hrf6zT77J6F1krpv',
      POSTGRES_URL: 'postgresql://noc_acbk_user:jGPN8KWblIObZYPMmySviM9sX9AxInhh@dpg-d57d40khg0os73b6svj0-a.oregon-postgres.render.com/noc_acbk?sslmode=require'
    });
  })
  
})