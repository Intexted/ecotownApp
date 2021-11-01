import Campain from "../models/campain.js";

//campain
export const addCampain = async (req, res) => {
  const { title, description, conditions, deadline, subtitle, image } =
    req.body;
  if (!title) {
    return res.status(400).send({
      error: "title is required.",
    });
  }
  if (!description) {
    return res.status(400).send({
      error: "description is required.",
    });
  }
  if (!conditions) {
    return res.status(400).send({
      error: "conditions are required.",
    });
  }
  if (!deadline) {
    return res.status(400).send({
      error: "deadline is required.",
    });
  }

  const campain = new Campain({
    title,
    description,
    conditions,
    deadline,
    subtitle,
    image,
  });
  try {
    await campain.save();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getCampains = async (req, res) => {
  try {
    const campains = await Campain.find().populate(
      "_id",
      "title description conditions deadline subtitle image"
    );
    res.json(campains);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getCampainDetails = async (req, res) => {
  try {
    const campain = await Campain.findById(req.body._id).populate(
      "_id",
      "title description conditions deadline"
    );
    res.json(campain);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
