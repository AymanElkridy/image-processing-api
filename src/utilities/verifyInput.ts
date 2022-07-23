// Importing Dependency to Deal with Parsed Query String
import { ParsedQs } from 'qs';

// This is a function that takes the Query of Express.Request
// and returns 1 of 2 options:
// 1. An array following the format [filename, width, height]
//    in case the given parameters were correct [string, number, number]
//
// 2. An array following the format [errorCode, errorMessage, ...]
//    in case of any errors that doesn't allow for first case [number, string, ...]

const verifyInput = (query: ParsedQs): (string | number)[] => {
  // An array to return with results
  const params = [];

  // Getting filename
  if (!query.filename) {
    params.unshift(400, 'Error: filename is not specified');
  } else if (/[/\\:"<>*?|]/.test(String(query.filename))) {
    params.unshift(
      400,
      'Error: filename can\'t have any of the following symbols  \\/:*?"<>|.'
    );
  } else {
    params.push(query.filename as unknown as string);

    // Getting width
    if (!query.width) {
      params.unshift(400, 'Error: width is not specified');
    } else if (isNaN(Number(query.width))) {
      params.unshift(400, 'Error: width must be a number');
    } else if (Number(query.width) <= 0) {
      params.unshift(400, 'Error: width must be greater than 0');
    } else {
      params.push(query.width as unknown as number);

      // Getting height
      if (!query.height) {
        params.unshift(400, 'Error: height is not specified');
      } else if (isNaN(Number(query.height))) {
        params.unshift(400, 'Error: height must be a number');
      } else if (Number(query.height) <= 0) {
        params.unshift(400, 'Error: height must be greater than 0');
      } else {
        params.push(query.height as unknown as number);
      }
    }
  }
  return params;
};

export default verifyInput;
