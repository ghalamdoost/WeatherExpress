// Importing required libraries
const cron = require("node-cron");
const express = require("express");
var cronTask=require('./cronTask');
  
app = express(); // Initializing app
  
// Creating a cron job which runs on every 10 second
cron.schedule("*/10 * * * * *", function() {
    //cronTask.syncWeather();
});
  