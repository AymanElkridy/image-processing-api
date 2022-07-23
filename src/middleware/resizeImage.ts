import express from 'express';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import verifyInput from '../utilities/verifyInput';

const imageDir = './assets/images/';
const thumbDir = './assets/images/thumbnails/';

const resizeImage = async (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  // Getting verified input from query
  const params = verifyInput(req.query);
  // Checking if parameters are correct
  if (isNaN(Number(params[0]))) {
    const [filename, width, height] = [...params];
    const thumbPath = `${thumbDir}${filename}-${width}-${height}.jpg`;
    try {
      // Checking if image is resized before
      const thumb = await fs.readFile(thumbPath);
      res.status(200).end(thumb);
    } catch {
      try {
        // Grabbing original image
        const img = await fs.readFile(`${imageDir}${filename}.jpg`);
        try {
          // Resizing image, saving it, then rendering it
          await sharp(img)
            .resize(Number(width), Number(height))
            .toFile(thumbPath);
          const thumb = await fs.readFile(thumbPath);
          res.status(200).end(thumb);
        } catch (err) {
          // Catching processing file error
          console.error(err);
          res.status(400).end('Error: Failed to process file');
        }
      } catch {
        res.status(400).end(`Error: Could not find image.
       Make sure that the file name is spelled correctly
       and that the image exists in the images directory.`);
      }
    }
  } else {
    res.status(params[0] as number).end(params[1] as string);
  }
  next();
};

export default resizeImage;
