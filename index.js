require('dotenv').config();

const app = require('express')();
const cors = require('cors');
const port = process.env.PORT || 1010;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authorize } = require('./auth/authorization');

const usersRoutes = require('./routes/users');

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080',
}
));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

authorize();

const auth = require('./middleware/auth');
const { RegisterUser, LoginUser, getUserDetails, LogoutUser } = require('./controller/AuthController');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

app.use('/api/users', usersRoutes);

console.log(app);

app.listen(port, (req, res) => {
  console.log(`Running and healthy on port: ${port}`)
})

app.get('/', (req, res) => {
  console.log(`Cookies are ${req.cookies.token}`);
  res.send(req.cookies.token);
})
