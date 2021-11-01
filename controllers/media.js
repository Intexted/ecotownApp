import Media from "../models/media";

// Event
export const addMedia = async (req, res) => {
  const {
    title,
    description,
    doctorName,
    doctorDepartment,
    tags,
    date,
    image,
  } = req.body;

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

  const media = new Media({
    title,
    description,
    doctorName,
    doctorDepartment,
    tags,
    date,
    image,
  });
  try {
    await media.save();
    return res.json(media);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getMedias = async (req, res) => {
  try {
    const medias = await Media.find().populate(
      "_id",
      "title description image doctorName doctorDepartment tags date "
    );
    res.json(medias);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getMediaDetails = async (req, res) => {
  try {
    const media = await Media.findById(req.body._id).populate(
      "_id",
      "title description image doctorName doctorDepartment tags date "
    );
    res.json(media);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
