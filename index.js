var express = required('express');
require('dotenv').config();
var app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.get('/', (request, response) => {
  request.send('Hi there!');
})
