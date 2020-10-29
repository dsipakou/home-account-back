const app = require('express')();
require('dotenv').config();
const port = process.env.PORT || 6000;
const mongoose = require('mongoose');
console.log(process.env)

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

app.listen(port, (request, response) => {
  console.log(`Running and healthy on port: {port}`)
})
