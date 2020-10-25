var express = required('express');
var app = express();

app.get('/', (request, response) => {
  request.send('Hi there!');
})
