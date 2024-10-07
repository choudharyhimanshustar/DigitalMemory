const express = require('express');
const connect = require('./connection/db');
const cors = require('cors');
require('dotenv').config();
const signUp = require('./SignUp')
const Login = require('./Login');
const app = express();
const Home = require('./Home')
connect();
const allowedOrigins = [
    'https://digital-memory-one.vercel.app',
    'http://localhost:3000'  // Allow local requests
];
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.options('*', cors());
app.use(express.json());
app.use('/', Home);
app.use('/signUp', signUp);
app.use('/login', Login);
const PORT = 2000;
app.listen(PORT, () => { console.log(`Server connected on ${PORT}`) });