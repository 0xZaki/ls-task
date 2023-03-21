require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')

const tasks = require('./routes/tasks.js');
const auth = require('./routes/auth.js');
const middleware = require('./middlewares/errorHandler.js');

const app = express();

app.use(express.json());


app.use('/api/v1/tasks', tasks);
app.use('/api/v1/auth', auth);  
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      console.log('Connected to database')
    }).catch((err) => {
      console.log('Not Connected to Database ERROR! ', err)
    })

    app.listen( PORT  , () =>
      console.log(`Server is running on port ${PORT}`) 
    );
  } catch (error) {
    console.log(error);
  }
};

start();

exports.app = app;