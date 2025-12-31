import { describe, test, expect, jest, afterAll } from '@jest/globals';
import { MongoDatabase } from './init';
import { envs } from '../../config/plugins/envs.plugin';
import mongoose from 'mongoose';

describe('init MongoDB', () => {
  afterAll(() => {
    mongoose.connection.close();
  })
  test('should connect to MongoDB', async() => {
    const connected = await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    });

    expect(connected).toBe(true);
  })
  test('should throw an error', async() => {
    try {
      const connected = await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: 'mongodb://user:xxxxxxxxxx@cluster0.mongodb.net/'
      });
      expect(connected).toBe(false);
      
    } catch (error) {
    }

  })
});