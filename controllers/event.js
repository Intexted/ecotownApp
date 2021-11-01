import Event from "../models/event";

// Event
export const addEvent = async (req, res) => {
  const { title, description } = req.body;
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

  const event = new Event({
    title,
    description,
  });
  try {
    await event.save();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("_id", "title description ");
    res.json(events);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.body._id).populate(
      "_id",
      "title description "
    );
    res.json(event);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
