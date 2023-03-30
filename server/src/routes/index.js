const express = require('express')
const app = express()
const authRoutes = require('./authRoute')

// initialize routes

// auth routes
app.use('/auth', authRoutes);

// export app
module.exports = app;