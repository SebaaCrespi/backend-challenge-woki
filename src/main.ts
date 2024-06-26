import express from 'express';
import { connectDB } from './infrastructure/persistence/config/dbConfig';
import projectRouter from './interface/http/routes/projectRoutes';
import userRouter from './interface/http/routes/userRoutes';
import taskRouter from './interface/http/routes/taskRoutes';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/tasks', taskRouter);
app.use('/projects', projectRouter);
app.use('/users', userRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database', error);
});