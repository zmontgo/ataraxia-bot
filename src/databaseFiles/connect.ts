// Database requirements - Connection created at end
import { MongoClient } from 'mongodb';
import config from '../config';

// Create connection
const client = new MongoClient(config.mongodbURI);

client.connect();

// Make sure MongoDB can be accessed outside of this file
export const Prefixes = client
  .db(config.mongodbDatabase)
  .collection('Prefixes');
export const BotStats = client
  .db(config.mongodbDatabase)
  .collection('BotStats');
export const ServerSetup = client
  .db(config.mongodbDatabase)
  .collection('ServerSetup');
export const Stars = client.db(config.mongodbDatabase).collection('Starboard');