# Image Processing API

## Description:
This is an API that takes an image file name and desired width and height, then resizes the image and outputs the resized image in a , saving it using its original name concatenated to `-${width}-${height}.jpg`.

## How To Use:
1. Add a JPEG image to the [images](assets/images/) directory.
2. Start the server.
3. Submit a GET request through the URL in the following format:
   `http://localhost:< port is 3002 >image?filename=< the image file name without .jpg >&width=< desired width >&height=< desired height >`.
5. Find the resized image in the [thumbnails](assets/thumbnails/) directory.

## Scripts:
- **srcstart:** Runs the server from ./src directory.
- **build:** Transpiles TypeScript to JavaScript in the ./build directory.
- **buildstart:** Runs the server form the ./build directory.
- **start:** Both transpiles and runs the server from the ./build directory. ---- ***important***
- **jasmine:** Runs Jasmine unit test on ./build/index.js (use after building).
- **test:** Both transpiles and runs Jasmine unit test on ./build/index.js. ---- ***important***

## Used Dependecies:
1. Development
   - eslint
   - jasmine
   - nodemon
   - prettier
   - supertest
   - typescript
   - @types and @typescript libraries
2. Production
   - express
   - fs
   - sharp

## Credits:
This project was done from scratch by Ayman Abdelwahed (AymanElkridy), only externally depending on libraries, documentations & developers community help, for the purpose of submitting as the first project in Udacity:tm: Advanced Full-Stack Web Development Scholarship.
All the material in this project is subject to open-source policy, available and free to use for and by anyone, crediting is not asked or expected, even though it is much appreciated.
