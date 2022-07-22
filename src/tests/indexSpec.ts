import supertest from 'supertest';
import { app } from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets nothing from the image endpoint', async () => {
    const response = await request.get('/image');
    expect(response.status).toBe(400);
  });
  it('gets an error from a non-existing image', async () => {
    const response = await request.get(
      '/image?filename=someimage&width=200&height=200'
    );
    expect(response.status).toBe(400);
  });
  it('gets an existing image', async () => {
    const response = await request.get(
      '/image?filename=fjord&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });
});
