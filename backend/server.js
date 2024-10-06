const express = require('express');
const connect = require('./connection/db');
const cors = require('cors');
require('dotenv').config();
const signUp = require('./SignUp')
const Login=require('./Login');
const app = express();
const Home=require('./Home')
connect();
app.use(cors({
    origin: 'https://digital-memory-one.vercel.app',  // Only allow requests from this origin
}));
app.use(express.json());
app.use('/',Home);
app.use('/signUp', signUp);
app.use('/login', Login);
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => { console.log(`Server connected on ${PORT}`) });