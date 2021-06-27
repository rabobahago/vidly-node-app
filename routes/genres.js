const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const GenresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
});
const Genre = mongoose.model("Genre", GenresSchema);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.status(200).send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send("Genre with the given ID not found");
    return;
  }
  return res.status(200).send(genre);
});

//post a movies

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let genre = Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  return res.status(200).send(genre);
});

// update a particular movies

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Genre with the given ID not found");

  return res.status(200).send(genre);
});
router.delete("/:id", async (req, res) => {
  let genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre with the given ID not found");
  return res.status(200).send(genre);
});
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}
module.exports = router;
