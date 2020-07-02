const express = require('express');
const Joi = require('@hapi/joi');

const validate = require('../lib/validate');

const app = express();

app.use(require('body-parser').json());

// Routes
app.get('/posts', validate({
  query: {
    limit: Joi.number().required()
  }
}), (req, res) => res.send('ok'));


app.get('/contacts/:id', validate({
  params: {
    id: Joi.number().required()
  }
}), (req, res) => res.send('ok'));


app.get('/health', validate(), (req, res) => res.send('ok'));


app.post('/contacts', validate({
  body: {
    firstName: Joi.string().required(),
    email: Joi.string().email().required()
  }
}), (req, res) => res.send('ok'));


module.exports = app;
