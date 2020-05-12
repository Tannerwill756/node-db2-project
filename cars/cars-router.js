const express = require("express");

const db = require("../data/dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve fruits" });
    });
});

module.exports = router;
