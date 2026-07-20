"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data for development and QA.
 * Creates starter users, teams, and activities for the OctoFit application.
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await User_1.User.deleteMany({});
        await Team_1.Team.deleteMany({});
        await Activity_1.Activity.deleteMany({});
        const users = await User_1.User.create([
            { username: 'Ava', email: 'ava@example.com', role: 'captain' },
            { username: 'Noah', email: 'noah@example.com', role: 'member' },
            { username: 'Mia', email: 'mia@example.com', role: 'member' }
        ]);
        await Team_1.Team.create([
            { name: 'Trail Blazers', sport: 'running', members: users.map((user) => user.username) },
            { name: 'Peak Pals', sport: 'cycling', members: ['Ava', 'Mia'] }
        ]);
        await Activity_1.Activity.create([
            { userId: users[0]._id.toString(), type: 'run', duration: 45, date: new Date() },
            { userId: users[1]._id.toString(), type: 'cycle', duration: 30, date: new Date() },
            { userId: users[2]._id.toString(), type: 'swim', duration: 20, date: new Date() }
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
