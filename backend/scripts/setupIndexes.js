const mongoose = require('mongoose');
require('dotenv').config();

const Session = require('../models/Session');
const UserSheetProgress = require('../models/UserSheetProgress');
const Question = require('../models/Question');

async function setupIndexes() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected.');

    console.log('Creating indexes for UserSheetProgress...');
    // Compound index as mentioned in the issue
    await UserSheetProgress.collection.createIndex({ userId: 1, sheetId: 1, status: 1 });
    await UserSheetProgress.collection.createIndex({ userId: 1 });
    
    console.log('Creating indexes for Session...');
    await Session.collection.createIndex({ user: 1, createdAt: -1 });
    
    console.log('Creating indexes for Question...');
    await Question.collection.createIndex({ session: 1 });

    console.log('Indexes created successfully.');
  } catch (error) {
    console.error('Error creating indexes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

setupIndexes();
