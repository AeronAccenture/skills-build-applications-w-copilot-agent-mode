import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Seed development/test data for the OctoFit database with starter users, teams, and activities.
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});

    const users = await User.create([
      { username: 'Ava', email: 'ava@example.com', role: 'captain' },
      { username: 'Noah', email: 'noah@example.com', role: 'member' },
      { username: 'Mia', email: 'mia@example.com', role: 'member' }
    ]);

    await Team.create([
      { name: 'Trail Blazers', sport: 'running', members: users.map((user) => user.username) },
      { name: 'Peak Pals', sport: 'cycling', members: ['Ava', 'Mia'] }
    ]);

    await Activity.create([
      { userId: users[0]._id.toString(), type: 'run', duration: 45, date: new Date() },
      { userId: users[1]._id.toString(), type: 'cycle', duration: 30, date: new Date() },
      { userId: users[2]._id.toString(), type: 'swim', duration: 20, date: new Date() }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
