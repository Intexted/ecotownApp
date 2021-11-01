import Story from "../models/story";

// Story
export const addStory = async (req, res) => {
  const { title, description, images } = req.body;
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

  const story = new Story({
    title,
    description,
    images,
  });
  try {
    await story.save();
    return res.json(story);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find().populate(
      "_id",
      "title description images "
    );
    res.json(stories);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getStoryDetails = async (req, res) => {
  try {
    const story = await Story.findById(req.body._id).populate(
      "_id",
      "title description images"
    );
    res.json(story);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
