"use strict";

const client = require("./index");

const lists = client.db("reminders-db").collection("lists");

const fetchLists = () => {
  return lists.find().toArray();
};

const addList = async (list) => {
  return lists.insertOne({
    name: list.name,
    id: list.id,
    length: list.length,
  });
};

module.exports = { fetchLists, addList, lists };
