
import cors from 'cors';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import userRoutes from './routes/userRoutes'
import contactRoutes from './routes/contactRoutes'
import spamRoutes from './routes/spamRoutes'
import searchRoutes from './routes/searchRoutes'
import getAllRoutes from './routes/getAllRoutes'
import "reflect-metadata";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRoutes)
app.use('/contact', contactRoutes)
app.use('/spam', spamRoutes)
app.use('/search', searchRoutes)
app.use('/getAll', getAllRoutes)

createConnection()

  .then(async () => {
    app.listen(PORT, async () => {
      console.log(`CONNECTED TO DB AND SERVER STARTED ON PORT  ${PORT}`);
    });
  })

  .catch((error) => console.log(error));