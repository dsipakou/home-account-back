require('dotenv').config();

const app = require('express')();
const port = process.env.PORT || 6000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const { auth } = require('./middleware/auth');
const { RegisterUser, LoginUser } = require('./controller/AuthController');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

app.listen(port, (request, response) => {
  console.log(`Running and healthy on port: ${port}`)
})

app.post('/api/users/register', RegisterUser);
app.post('/api/users/login', LoginUser);
