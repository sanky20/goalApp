const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware.js');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000

const app= express();

// @middleware for POST request 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/g oals' , require('./routes/goalRoutes.js'))


// @middleware for designing custom-made errorHandler
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started at Port ${port}`))
