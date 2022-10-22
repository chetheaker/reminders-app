"use strict";

const client = require("./index");

const { lists } = require("./lists.model");

const reminders = client.db("reminders-db").collection("reminders");

const fetchRemindersByList = (listId) => {
  return reminders.find(listId).toArray();
};

const addReminder = async (reminder) => {
  lists.updateOne({ id: reminder.listId }, { $inc: { length: 1 } });
  return reminders.insertOne({
    content: reminder.content,
    id: reminder.id,
    listId: reminder.listId,
    completed: false,
  });
};

module.exports = { fetchRemindersByList, addReminder };
