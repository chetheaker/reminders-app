"use strict";

const router = require("express").Router();

router.get("/hello", (req, res) => {
  res.send("this is working");
});

module.exports = router;
