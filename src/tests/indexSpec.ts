import supertest from 'supertest';
import { app } from '../index';
import { promises as fs } from 'fs';
import { imageDir, thumbDir } from '../middleware/resizeImage';
import sharp from 'sharp';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets nothing from the image endpoint', async () => {
    const response = await request.get('/image');
    expect(response.status).toBe(400);
  });
  it('gets an error from a non-existing image', async () => {
    const response = await request.get(
      '/image?filename=someimage&width=400&height=225'
    );
    expect(response.status).toBe(400);
  });
  it('gets an existing image', async () => {
    const response = await request.get(
      '/image?filename=sample&width=400&height=225'
    );
    expect(response.status).toBe(200);
  });
});

describe('Test image resizing', () => {
  it('returns an image with the desired dimensions', async () => {
    const image = await fs.readFile(`${imageDir}sample.jpg`);
    const resized = await sharp(image)
      .resize(600, 338)
      .toFile(`${thumbDir}test.jpg`);
    expect(resized.width).toBe(600);
    expect(resized.height).toBe(338);
  });
});
