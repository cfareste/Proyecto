import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import userRouter from './router/user.route.js';
import courseRouter from './router/course.route.js';
import streakRouter from './router/streak.route.js';
import lessonRouter from './router/lesson.route.js';
import unitRouter from './router/unit.route.js';
import exerciseRouter from './router/exercise.route.js';

const app = express();

app.use('/public', express.static('public'))
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/streaks', streakRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/units', unitRouter);
app.use('/api/exercises', exerciseRouter);

app.listen(config.PORT, () => {
    console.log('Server on!');
})