import supertest from 'supertest';
import app from '../index';

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
});
