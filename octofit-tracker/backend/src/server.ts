import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';
import './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});

app.use(usersRouter);
app.use(activitiesRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit backend listening on port ${port}`);
  console.log(`Base URL: ${baseUrl}`);
});
