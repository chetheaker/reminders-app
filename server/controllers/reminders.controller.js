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

const updateReminderCompleted = async (req, res) => {
  try {
    const rme = await remindersModel.updateReminder(req.body);
    res.send(rme);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
};

const deleteReminder = async (req, res) => {
  try {
    const result = await remindersModel.deleteReminder(req.params);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getRemindersByList,
  createReminder,
  updateReminderCompleted,
  deleteReminder,
};
