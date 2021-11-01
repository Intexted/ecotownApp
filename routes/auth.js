import express from "express";

const router = express.Router();

import {
  addAppointment,
  getAppointments,
  getAppointmentDetails,
  getAppointmentsByDate,
} from "../controllers/appointment";

import { addBlog, getBlogs, getBlogDetails } from "../controllers/blog";
import { addEvent, getEvents, getEventDetails } from "../controllers/event";
import { addMedia, getMedias, getMediaDetails } from "../controllers/media";
import { addStory, getStories, getStoryDetails } from "../controllers/story";

import {
  register,
  login,
  verifyOtp,
  forgotPassword,
  resetPassword,
  updateProfile,
  getUserProfile,
  addNotification,
  addFavouriteVideos,
} from "../controllers/auth.js";

import {
  addCampain,
  getCampains,
  getCampainDetails,
} from "../controllers/campain";

import {
  addDepartement,
  getDepartements,
  getDepartementDetails,
  addDepartementPost,
} from "../controllers/departement";

import {
  addDoctorSlot,
  getDoctorsOnSlot,
  addDoctorRate,
  addReview,
  addDoctor,
  getDoctors,
  getDoctorProfile,
} from "../controllers/doctor";

//sign-up
router.post("/register", register);
router.post("/verify-otp", verifyOtp);

//sign-in
router.post("/login", login);

// forgot password
router.post("/forgot-password", forgotPassword);

// reset password
router.post("/reset-password", resetPassword);

//doctors
router.post("/add-doctor", addDoctor);
router.get("/get-doctors", getDoctors);
router.get("/get-doctor-profile", getDoctorProfile);
router.post("/add-doctor-slot", addDoctorSlot);
router.get("/get-available-doctors-onslot", getDoctorsOnSlot);
router.post("/add-doctor-rate", addDoctorRate);
router.post("/add-doctor-review", addReview);

//campains
router.post("/add-campain", addCampain);
router.get("/get-campains", getCampains);
router.get("/get-campain-details", getCampainDetails);

//medias
router.post("/add-media", addMedia);
router.get("/get-medias", getMedias);
router.get("/get-media-details", getMediaDetails);

//stories
router.post("/add-story", addStory);
router.get("/get-stories", getStories);
router.get("/get-story-details", getStoryDetails);

//departements
router.post("/add-departement", addDepartement);
router.get("/get-departements", getDepartements);
router.get("/get-departement-details", getDepartementDetails);
router.post("/add-departement-post", addDepartementPost);

// blog
router.post("/add-blog", addBlog);
router.get("/get-blogs", getBlogs);
router.get("/get-blog-details", getBlogDetails);

// events
router.post("/add-event", addEvent);
router.get("/get-events", getEvents);
router.get("/get-event-details", getEventDetails);

//update-profile
router.post("/update-profile", updateProfile);
router.post("/add-notification-profile", addNotification);
router.post("/add-favourite-videos-profile", addFavouriteVideos);

//get-profile
router.get("/get-user-profile", getUserProfile);

//appointment
router.post("/add-appointment", addAppointment);
router.get("/get-appointments", getAppointments);
router.get("/get-appointments-by-date", getAppointmentsByDate);
router.get("/get-appointment-details", getAppointmentDetails);

module.exports = router;
