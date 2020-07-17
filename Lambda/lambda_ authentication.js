exports.handler = (event, context, callback) => {

  const request = event.Records[0].cf.request;
  const headers = request.headers;

  const user = 'surajvijay';
  const pw = 'pass1234pass';

  const authString = 'Basic ' + new Buffer(user + ':' + pw).toString('base64');

  if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != authString) {
    const response = {
      status: '401',
      statusDescription: 'Unauthorized',
      body: 'Unauthorized',
      headers: {
        'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
      },
    };
    callback(null, response);
  }

  callback(null, request);
};