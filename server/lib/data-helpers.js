"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: function(newTweet, callback) {
        db.collection("tweeter").insertOne(newTweet);
        callback(null, true);
    },
    getTweets: function(callback) {
      db.collection("tweeter").find().toArray(callback);
    }
  }
}