// IMPORTING DEPENDENCIES

import express from 'express';
import { promises as fs } from 'fs';
import sharp from 'sharp';

// CREATING APP INSTANCE

const app = express();
const port:number = 3002;
const listener = ():void => {console.log(`server running on port: ${port}`);}

// GLOBAL CONSTANTS

const baseURL:string = `localhost:${port}`;
const imageEndPoint:string = '/image';
const imageDir:string = './assets/images/';
const thumbDir:string = './assets/images/thumbnails/';

// IMAGE RESIZING GET REQUEST

app.get(imageEndPoint, async (req, res) => {
  
  // Declaring variables
  let filename:string = '', width:number = 0, height:number = 0;

  // Getting filename
  if (!req.query.filename) {
    res.status(400).end('Error: filename is not specified');
  } else {
    filename = (req.query.filename as unknown) as string;

    // Getting width
    if (!req.query.width) {
      res.status(400).end('Error: width is not specified');
    } else if (isNaN(Number(req.query.width))) {
      res.status(400).end('Error: width must be a number');
    } else if (Number(req.query.width) === 0) {
      res.status(400).end('Error: width must be greater than 0');
    } else {
      width = (req.query.width as unknown) as number;

      // Getting height
      if (!req.query.height) {
        res.status(400).end('Error: height is not specified');
      } else if (isNaN(Number(req.query.height))) {
        res.status(400).end('Error: height must be a number');
      } else if (Number(req.query.height) === 0) {
        res.status(400).end('Error: height must be greater than 0');
      } else {
        height = (req.query.height as unknown) as number;
      }
    }
  }

  // Checking if parameters are correct
  if (filename && width && height) {
    let thumbPath = `${thumbDir}${filename}-${width}-${height}.jpg`;
    try { // Checking if image is resized before
      const thumb = await fs.readFile(thumbPath);
      res.status(200).end(thumb);
    } catch {
      try { // Resizing image, saving it, then rendering it
        const img = await fs.readFile(`${imageDir}${filename}.jpg`);
        await sharp(img).resize(Number(width), Number(height)).toFile(thumbPath);
        const thumb = await fs.readFile(thumbPath);
        res.status(200).end(thumb);
      } catch (err) { // Catching processing file error
        console.error(err);
        res.status(400).end('Error: Failed to process file');
      }
    }
  }
});

// START THE SERVER

app.listen(port, listener);