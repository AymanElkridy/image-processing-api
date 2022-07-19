import express from 'express';
import fs from 'fs';
import sharp from 'sharp';

const app = express();

app.get('/', (req, res) => {
  res.send('this worked!');
});

const imageDir = './src/images/';
const thumbDir = './src/images/thumbnails/';

app.get('/image',(req, res) => {
  const parameters = req.url.substring(7).split('&');
  if (!parameters[0]) res.send('Error: Nothing is specified')
  let filename:string = '', width:number = 0, height:number = 0;
  !parameters[0] || parameters[0].split('=')[0] !== 'filename' ?
  res.send('Error: filename is not specified') :
  filename = parameters[0].split('=')[1];
  !parameters[1] || parameters[1].split('=')[0] !== 'width' ?
  res.send('Error: width is not specified') :
  width = (parameters[1].split('=')[1] as unknown) as number;
  !parameters[2] || parameters[2].split('=')[0] !== 'height' ?
  res.send('Error: height is not specified') :
  height = (parameters[2].split('=')[1] as unknown) as number;
  fs.readFile(`${thumbDir}${filename}-${width}-${height}.jpg`,(err, img) => {
    if (err) {
      fs.readFile(`${imageDir}${filename}.jpg`, (err, img) => {
        if (err) {
          res.send('Error: No image found');
        }
        sharp(img)
        .resize(Number(width), Number(height))
        .toFile(`${thumbDir}${filename}-${width}-${height}.jpg`)
        .then(info => {
          fs.readFile(`${thumbDir}${filename}-${width}-${height}.jpg`, (err, img) => {
            if (err) throw err;
            res.end(img);
          });
        });
      });
    }
    res.end(img);
  });
});


app.get('/try', (req, res) => {
  fs.readFile(`${imageDir}santamonica.jpg`, (err, img) => {
    if (err) throw err;
    res.end(img);
  });
});

const port:number = 3002;
const listener = ():void => {console.log(`server running on port: ${port}`);}
app.listen(port, listener);