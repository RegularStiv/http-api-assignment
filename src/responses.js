const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, stringXML) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(stringXML);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] !== 'application/json') {
    const responseXML = '<response><message>This is a successful response</message></response>';
    return respondXML(request, response, 200, responseXML);
    
  }
  const responseJSON = {
    message: 'This is a successful response',
  };
  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'missing valid query param equal to true';
    responseJSON.id = 'badRequestMissingParam';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  notFound,
};
