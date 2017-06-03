# Route validation for Express using Joi

![](https://travis-ci.org/tinacious/express-joi-validate.svg?branch=master)
[![codecov](https://codecov.io/gh/tinacious/express-joi-validate/branch/master/graph/badge.svg)](https://codecov.io/gh/tinacious/express-joi-validate)

This custom middleware is for those who prefer to use Express but want to use the Joi validation library to validate the query, params, and body of requests.

## Usage

Without route validation, an endpoint may look something like this:

```js
app.get('/contacts/:id', contactsHandler);
```

To implement route validation, simply call the provided validation function with the desired schema that uses Joi:

```js
const validate = require('express-joi-validate');

const contactSchema = {
  params: {
    id: Joi.number().required()
  }
};

app.get('/contacts/:id', validate(contactSchema), contactsHandler);
```

## Development

### Testing

Test the 3 different types of validations using the tests and mock server:

```
npm test
```