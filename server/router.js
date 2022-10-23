"use strict";

const router = require("express").Router();

const { getAllLists, createList } = require("./controllers/lists.controller");
const {
  getRemindersByList,
  createReminder,
  updateReminderCompleted,
  deleteReminder,
} = require("./controllers/reminders.controller");

router.get("/lists", getAllLists);
router.post("/lists", createList);

router.get("/reminders/:listId", getRemindersByList);
router.post("/reminders", createReminder);
router.put("/reminders", updateReminderCompleted);
router.delete("/reminders/:id", deleteReminder);

module.exports = router;
