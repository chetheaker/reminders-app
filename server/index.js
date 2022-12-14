"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const cors = require("cors");

const PORT = 4040;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
