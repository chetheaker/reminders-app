"use strict";

const listsModel = require("../models/lists.model");

const getAllLists = async (req, res) => {
  try {
    const reminders = await listsModel.fetchLists();
    res.status(200);
    res.send(reminders);
  } catch (e) {
    console.log("Get all lists error: ", e);
    res.status(500);
    res.send(e);
  }
};

const createList = (req, res) => {
  try {
    listsModel.addList(req.body);
    res.status(201);
    res.send(req.body);
  } catch (e) {
    console.log("create new list error: ", e);
    res.status(500);
    res.send(e);
  }
};

module.exports = { getAllLists, createList };
