import supertest from 'supertest';
import app from '../index';
import { ImageObject } from '../routes/api/images';
import resizeImage from '../services/resize';

const request = supertest(app);

describe('Test Image Endpoint', (): void => {
  it('If Not Exist Image', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?name=test&width=100&height=100'
    );

    expect(response.body).toEqual({
      Message: "Image is n't exist",
    });
  });

  it('Check validation if any not exist', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });

  it('Check valid inputs with exist image', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?name=image1&width=100&height=100'
    );
    expect(response.status).toBe(200);
  });

  it('Check Image Proccessing Functionality', async (): Promise<void> => {
    const inputImagePath = './images/input/image1.jpg';
    const outputImagePath = './images/output/image1_600_600.jpg';
    const imageObject: ImageObject = {
      name: 'image1',
      width: 600,
      height: 600,
    };
    expect(async () => {
      await resizeImage(imageObject, inputImagePath, outputImagePath);
    }).not.toThrow();
  });
});
