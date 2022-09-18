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
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>This is a successful response</message></response>';
    return respondXML(request, response, 200, responseXML);
  }
  const responseJSON = {
    message: 'This is a successful response',
  };
  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response><message>This request has the required parameters</message></response>';

    if (!params.valid || params.valid !== 'true') {
      responseXML = '<response><message>missing valid query param equal to true</message><id>badRequestMissingParam</id></response>';
      return respondJSON(request, response, 400, responseXML);
    }
    return respondXML(request, response, 200, responseXML);
  }

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

const unauthorized = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response><message>This request has the required parameters</message></response>';

    if (!params.valid || params.valid !== 'true') {
      responseXML = '<response><message>Missing Login paramater set to yes</message><id>unauthorized</id></response>';
      return respondJSON(request, response, 401, responseXML);
    }
    return respondXML(request, response, 200, responseXML);
  }

  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing Login paramater set to yes';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>You do not have access to this content</message><id>Forbidden</id></response>';
    return respondXML(request, response, 403, responseXML);
  }
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'Forbidden',
  };
  return respondJSON(request, response, 403, responseJSON);
};
const serverError = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>Internal server error. Something went wrong.</message><id>internalError</id></response>';
    return respondXML(request, response, 500, responseXML);
  }
  const responseJSON = {
    message: 'Internal server error. Something went wrong.',
    id: 'internalError',
  };
  return respondJSON(request, response, 500, responseJSON);
};
const notImplemented = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
    return respondXML(request, response, 501, responseXML);
  }
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  return respondJSON(request, response, 501, responseJSON);
};
const notFound = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
    return respondXML(request, response, 404, responseXML);
  }
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
  notImplemented,
  serverError,
  forbidden,
  unauthorized,
};
