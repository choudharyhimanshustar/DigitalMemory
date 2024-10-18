const express = require('express');
const connect = require('./connection/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const signUp = require('./SignUp')
const Login = require('./Login');
const app = express();
const Home = require('./Home')
const Memories = require('./Memories')
const GetMemories=require('./GetMemories')
const deleteMemory=require('./deleteMemory');
const UpdateMemory=require('./UpdateMemory');
const GetSpecificMemory=require('./GetSpecificMemories');
const GetEmotionalMemories=require('./GetEmotionalMemory')
const GetfavMemories=require('./GetfavMemories');
connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true
}));
app.use(cors({
  origin: 'https://digital-memory-one.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  credentials: true,
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://digital-memory-one.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.options('*', cors());
app.use('/', Home);
app.use('/signUp', signUp);
app.use('/login', Login);
app.use('/Memories', Memories);
app.use('/getMemories',GetMemories);
app.use('/delete',deleteMemory);
app.use('/update',UpdateMemory);
app.use('/getSpecificMemories',GetSpecificMemory);
app.use('/getEmotionalMemories',GetEmotionalMemories);
app.use('/getFavMemories',GetfavMemories);
const PORT = 2000;
app.listen(PORT,  '44.226.145.213',() => { console.log(`Server connected on ${PORT}`) });