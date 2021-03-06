const express = require("express");

const db = require("../data/dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.get("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .first()
    .then((car) => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({ message: "car with that ID doesn't exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get that car" });
    });
});

router.post("/", verifyBody, (req, res) => {
  db("cars")
    .insert(req.body)
    .then((postCar) => {
      console.log(req.body.mileage.length);
      res.status(200).json(postCar);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to post car" });
    });
});

router.put("/:id", verifyBody, (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .update(req.body)
    .then((upd) => {
      res.status(200).json(upd);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messag: err.message });
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then((del) => {
      if (del) {
        res.status(201).json(del);
      } else {
        res.status(404).json({ message: "record not found by that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messag: err.message });
    });
});

function verifyBody(req, res, next) {
  if (req.body.make && req.body.vin && req.body.model && req.body.mileage) {
    if (req.body.vin.length === 17) {
      if (req.body.make.length < 129 && req.body.model.length < 129) {
        if (typeof req.body.mileage !== "string") {
          next();
        } else {
          res.status(404).json({
            message:
              "Mileage can't be more than 6 digits and must be an integer",
          });
        }
      } else {
        res
          .status(404)
          .json({ messag: "No more than 128 characters for make and model" });
      }
    } else {
      res.status(404).json({ messag: "VIN must 17 characters long" });
    }
  } else {
    res
      .status(404)
      .json({ message: "Please provide a vin, make, model, and mileage" });
  }
}

module.exports = router;
