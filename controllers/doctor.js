import Doctor from "../models/doctor.js";

//doctor
export const addDoctor = async (req, res) => {
  const { name, departement, details, title, subtitle, image } = req.body;
  if (!name) {
    return res.status(400).send({
      error: "name is required.",
    });
  }
  if (!departement) {
    return res.status(400).send({
      error: "departement is required.",
    });
  }
  if (!details) {
    return res.status(400).send({
      error: "details is required.",
    });
  }
  const doctor = new Doctor({
    name,
    departement,
    details,
    title,
    subtitle,
    image,
  });
  try {
    await doctor.save();
    return res.json(doctor);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "_id",
      "name departement details lastReview title subtitle image"
    );
    res.json(doctors);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.body._id).populate(
      "_id",
      "name departement details lastReview title subtitle image"
    );
    res.json(doctor);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
export const addDoctorSlot = async (req, res) => {
  const { _id, startTime, endTime, status } = req.body;
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      _id,
      { $push: { slots: { startTime, endTime, status } } },
      { new: true }
    );
    res.json(doctor);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getDoctorsOnSlot = async (req, res) => {
  const { startTime, endTime, status } = req.body;
  try {
    const doctors = await Doctor.find({
      "slots.startTime": startTime,
      "slots.endTime": endTime,
      "slots.status": status,
    }).populate("_id", "name departement details calendar slots image");

    res.json(doctors);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const addDoctorRate = async (req, res) => {
  const { rating, _id } = req.body;
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      _id,
      { $push: { ratings: { rating } } },
      { new: true }
    );

    res.json(doctor);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const addReview = async (req, res) => {
  const { name, image, rating, comment, _id } = req.body;
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      _id,
      { $push: { review: { name, image, rating, comment } } },
      { new: true }
    );
    res.json(doctor);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
