const path = require('path');

const express = require("express");

const rootDir = require('../util/path');

const router = express.Router();

// /admin/* ->

router.get("/add-product", (req, res, next) => {
  console.log("In the middleware");
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;