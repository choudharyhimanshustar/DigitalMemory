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
const GetMemories = require('./GetMemories')
const deleteMemory = require('./deleteMemory');
const UpdateMemory = require('./UpdateMemory');
const GetSpecificMemory = require('./GetSpecificMemories');
const GetEmotionalMemories = require('./GetEmotionalMemory')
const GetfavMemories = require('./GetfavMemories');
connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://digital-memory-one.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.options('*', cors());
app.use('/', Home);
app.use('/signUp', signUp);
app.use('/login', Login);
app.use('/Memories', Memories);
app.use('/getMemories', GetMemories);
app.use('/delete', deleteMemory);
app.use('/update', UpdateMemory);
app.use('/getSpecificMemories', GetSpecificMemory);
app.use('/getEmotionalMemories', GetEmotionalMemories);
app.use('/getFavMemories', GetfavMemories);
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => { console.log(`Server connected on ${PORT}`) });