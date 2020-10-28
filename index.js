const app = required('express')();
require('dotenv').config();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

app.get(port, (request, response) => {
  request.send('Hi there!');
})
