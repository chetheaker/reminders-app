"use strict";

const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017/");

(async function () {
  try {
    await client.connect();
    console.log("Mongo DB connected");
  } catch (e) {
    console.log("DB could not connect: ", e);
  }
})();

module.exports = client;
