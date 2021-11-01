import Department from "../models/department";

// department
export const addDepartement = async (req, res) => {
  const { title, description, services } = req.body;
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

  const departement = new Department({
    title,
    description,
    services,
  });
  try {
    await departement.save();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getDepartements = async (req, res) => {
  try {
    const departements = await Department.find().populate(
      "_id",
      "title description services posts "
    );
    res.json(departements);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getDepartementDetails = async (req, res) => {
  try {
    const departement = await Department.findById(req.body._id).populate(
      "_id",
      "title description services posts "
    );
    res.json(departement);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
export const addDepartementPost = async (req, res) => {
  try {
    const { departementId, title, text } = req.body;
    if (!departementId) {
      return res.status(400).send({
        error: "departement Id is required",
      });
    }
    if (!title) {
      return res.status(400).send({
        error: "title is required",
      });
    }
    if (text) {
      return res.status(400).send({
        error: "text is required",
      });
    }

    const departement = await Department.findByIdAndUpdate(
      departementId,
      { $push: { posts: { title, text } } },
      { new: true }
    ).populate("_id", "title description services posts ");
    res.json(departement);
  } catch (error) {
    console.log(error.message);
  }
};
