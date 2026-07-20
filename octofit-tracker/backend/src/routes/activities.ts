import { Router } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

router.get('/api/activities', async (_req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

router.post('/api/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity' });
  }
});

export default router;
