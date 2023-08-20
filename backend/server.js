const express = require('express');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000

connectDB()

const app= express();

// @middleware for POST request 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals' , require('./routes/goalRoutes.js'))


// @middleware for designing custom-made errorHandler
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started at Port ${port}`))
