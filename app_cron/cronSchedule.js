// Importing required libraries
const cron = require("node-cron");
const express = require("express");
var cronTask=require('./cronTask');
  
app = express(); // Initializing app
  
// Creating a cron job which runs on every 1 hour
cron.schedule("0 * * * *", function() {
    console.log("Cron-Started")
    cronTask.syncWeather();
    console.log("Cron-Finished")
});
  