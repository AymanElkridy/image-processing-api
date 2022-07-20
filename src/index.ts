// IMPORTING DEPENDENCIES

import express from 'express';
import fs from 'fs';
import sharp from 'sharp';

// CREATING APP INSTANCE

const app = express();
const port:number = 3002;
const listener = ():void => {console.log(`server running on port: ${port}`);}

// GLOBAL CONSTANTS

const baseURL = `localhost:${port}`;
const imageEndPoint = '/image';
const imageDir = './src/images/';
const thumbDir = './src/images/thumbnails/';

// IMAGE RESIZING GET REQUEST

app.get(imageEndPoint,(req, res) => {
  
  // Declaring variables
  let filename:string = '', width:number = 0, height:number = 0;

  // Getting filename
  if (!req.query.filename) {
    res.send('Error: filename is not specified');
  } else {
    filename = (req.query.filename as unknown) as string;

    // Getting width
    if (!req.query.width) {
      res.send('Error: width is not specified');
    } else if (isNaN(Number(req.query.width))) {
      res.send('Error: width must be a number');
    } else if (Number(req.query.width) === 0) {
      res.send('Error: width must be greater than 0');
    } else {
      width = (req.query.width as unknown) as number;

      // Getting height
      if (!req.query.height) {
        res.send('Error: height is not specified');
      } else if (isNaN(Number(req.query.height))) {
        res.send('Error: height must be a number');
      } else if (Number(req.query.height) === 0) {
        res.send('Error: height must be greater than 0');
      } else {
        height = (req.query.height as unknown) as number;
      }
    }
  }

  // Checking if parameters are correct
  if (filename && width && height) {
    // Checking if image is previously resized
    fs.readFile(`${thumbDir}${filename}-${width}-${height}.jpg`,(err, img) => {
      if (err) { // Get the original image
        fs.readFile(`${imageDir}${filename}.jpg`, (err, img) => {
          if (err) { // File name doesn't match existing images
            res.send('Error: No image found');
          }
          // Resizing image and saving it on file system
          sharp(img)
          .resize(Number(width), Number(height))
          .toFile(`${thumbDir}${filename}-${width}-${height}.jpg`)
          .then(info => {
            console.log(res);
          });
        });
      }
      // Displaying the image if previously resized
      res.end(img);
    });
  }
});

// START THE SERVER

app.listen(port, listener);