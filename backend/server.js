const path = require('path');
const express = require('express');
var cors = require('cors')
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000

connectDB()

const app= express();
app.use(cors())

// @middleware for POST request 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals' , require('./routes/goalRoutes.js'))
app.use('/api/users' , require('./routes/userRoutes.js'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }

// @middleware for designing custom-made errorHandler
app.use(errorHandler)
// middleware is a function that runs during request-response cycle !!!


app.listen(port, ()=> console.log(`Server started at Port ${port}`))
