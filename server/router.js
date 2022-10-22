"use strict";

const router = require("express").Router();

const { getAllLists, createList } = require("./controllers/lists.controller");
const {
  getRemindersByList,
  createReminder,
} = require("./controllers/reminders.controller");

router.get("/lists", getAllLists);
router.post("/lists", createList);

router.get("/reminders/:listId", getRemindersByList);
router.post("/reminders", createReminder);

module.exports = router;
