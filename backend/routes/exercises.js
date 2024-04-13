// const router = require('express').Router;
const express = require("express");
const router = express.Router();
let Exercise = require("../models/exercise.model");

//get all
router.get("/", async (req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(err));
});
//get one
router.get("/:id", async (req, res) => {
  console.log(1111111);
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json(err));
});

 //delete one
 router.delete("/:id", (req, res) => {
    console.log("this is delete");
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json("Exercise deleted!"))
      .catch((err) => res.status(400).json(err));
  });

//add a new one
router.post("/add", (req, res) => {
  const newExercise = new Exercise({
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  });
    
  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json(err));
});

//update one
router.put("/update/:id", (req, res) => {
    Exercise.findById(req.params.id)
      .then((exercise) => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise
          .save()
          .then(() => res.json("Exercise updated!"))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  });

module.exports = router;
