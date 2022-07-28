import express from 'express';
import image from './api/images';

const routes = express.Router();

routes.get('/', (request, response) => {
  response.json({
    message: 'Image Processing Project',
  });
});

routes.use('/images', image);

export default routes;
