import express, { Application } from 'express';
import routes from './routes/index';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(morgan('dev'));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is started at port: ${PORT}`);
});
export default app;
