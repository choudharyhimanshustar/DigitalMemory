const express = require('express');
const connect = require('./connection/db');
const cors = require('cors');
require('dotenv').config();
const signUp = require('./SignUp')
const Login = require('./Login');
const app = express();
const Home = require('./Home')
connect();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.options('*', cors());
app.use(express.json());
app.use('/', Home);
app.use('/signUp', signUp);
app.use('/login', Login);
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => { console.log(`Server connected on ${PORT}`) });