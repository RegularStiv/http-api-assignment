const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/style.css': htmlHandler.getCSS,
  notFound: responseHandler.notFound,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/notImplemented': responseHandler.notImplemented,
  '/internal': responseHandler.serverError,
};
const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);
  const acceptedTypes = request.headers.accept.split(',');
  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
