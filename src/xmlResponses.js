const respondXML = (request, response, status, stringXML) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(stringXML);
  response.end();
};

const success = (request, response) => {
  const responseXML = '<p>This is a successful response</p>';
  // console.log(responseJSON);
  return respondXML(request, response, 200, responseXML);
};

const badRequest = (request, response, params) => {
  let responseXML = '<p>This request has the required parameters</p>';

  if (!params.valid || params.valid !== 'true') {
    responseXML = '<p>Missing valid query param equal to true</p><br><p>ID: badRequestMissingParam</p>';
    return respondXML(request, response, 400, responseXML);
  }

  return respondXML(request, response, 200, responseXML);
};

const notFound = (request, response) => {
  const responseXML = '<p>The page you are looking for cannot be found</p><br><p>ID: Not Found</p>';
  return respondXML(request, response, 404, responseXML);
};

module.exports = {
  success,
  badRequest,
  notFound,
};
