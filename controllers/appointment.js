import Appointment from "../models/appointment.js";
import User from "../models/user.js";
import Doctor from "../models/doctor.js";

// Appointment
export const addAppointment = async (req, res) => {
  const { date, doctorId, userId } = req.body;
  if (!date) {
    return res.status(400).send({
      error: "Date is required.",
    });
  }
  if (!doctorId) {
    return res.status(400).send({
      error: "doctor Id is required.",
    });
  }
  if (!userId) {
    return res.status(400).send({
      error: "user Id is required.",
    });
  }
  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    { $push: { calendar: { date, userId } } },
    { new: true }
  );

  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { calendar: { date, doctorId } } },
    { new: true }
  );
  const username = user.name;
  const doctorName = doctor.name;

  const appointment = new Appointment({
    date,
    doctorId,
    userId,
    username,
    doctorName,
  });
  try {
    await appointment.save();
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "_id",
      "date doctorId userId username doctorName "
    );
    res.json(appointments);
  } catch (error) {
    console.log(error);
  }
};
export const getAppointmentsByDate = async (req, res) => {
  const { date } = req.body;
  try {
    const appointments = await Appointment.find({ date: date }).populate(
      "_id",
      "date doctorId userId username doctorName "
    );
    res.json(appointments);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentDetails = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.body._id).populate(
      "_id",
      "date doctorId userId username doctorName"
    );
    res.json(appointment);
  } catch (error) {
    console.log(error);
  }
};
