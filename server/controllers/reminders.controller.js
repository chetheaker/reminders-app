"use strict";

const remindersModel = require("../models/reminders.model");

const getRemindersByList = async (req, res) => {
  try {
    const reminders = await remindersModel.fetchRemindersByList(req.params);
    res.status(200);
    res.send(reminders);
  } catch (e) {
    console.log("Get reminders by list error: ", e);
    res.status(500);
    res.send(e);
  }
};

const createReminder = async (req, res) => {
  try {
    await remindersModel.addReminder(req.body);
    res.status(201);
    res.send(req.body);
  } catch (e) {
    console.log("create new reminder error: ", e);
    res.status(500);
    res.send(e);
  }
};

module.exports = { getRemindersByList, createReminder };
