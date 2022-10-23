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

const updateReminder = async (reminder) => {
  console.log("reminder changed to ", !reminder.completed);
  return reminders.updateOne(
    { id: reminder.id },
    {
      $set: { completed: !reminder.completed },
    }
  );
};

const deleteReminder = async (id) => {
  const reminderToDelete = await reminders.find(id).toArray();
  await lists.updateOne(
    { id: reminderToDelete[0].listId },
    { $inc: { length: -1 } }
  );
  return await reminders.deleteOne(id);
};

module.exports = {
  fetchRemindersByList,
  addReminder,
  updateReminder,
  deleteReminder,
};
