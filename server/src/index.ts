import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const startTime = performance.now();

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}


// Rotas da API

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  const duration = Math.round(performance.now() - startTime);
  console.log(chalk.blue(`\n🚀 SERVER ready in ${duration} ms\n`));
  console.log(chalk.blue(`➜  Local:   http://localhost:${PORT}/\n`));
});