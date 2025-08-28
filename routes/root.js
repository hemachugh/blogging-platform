const express = require("express");
const rootController = require("../controllers/root");
const route = express.Router();
route.get("/", rootController.getRoot);
module.exports = route;
