const express = require('express')
const app = express()
const authRoutes = require('./authRoute')
const dashBoardRoutes = require('./dashboardRoute')

// initialize routes

app.use('/', (req, res) => {
  res.send("<h1>Api</h1>");
});

// auth routes
app.use('/auth', authRoutes);

// dashboard route
app.use('/dashboard', dashBoardRoutes);

// export app
module.exports = app;
