const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5200;

app.use(cors());


const uri = "mongodb://localhost:27017/mern" ;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('mognodb database connection established successfully')
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})