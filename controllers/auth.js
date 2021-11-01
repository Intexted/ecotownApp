import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
const nodemailer = require("nodemailer");

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

//Sign up
export const register = async (req, res) => {
  const { name, email, password, mobileNo } = req.body;

  if (!name) {
    return res.status(400).send({
      error: "Name is required",
    });
  }
  if (!email) {
    return res.status(400).send({
      error: "Email is required",
    });
  }
  if (!password || password.length < 6) {
    return res.status(400).send({
      error: "password is required and should be at least 6 character long",
    });
  }

  if (!mobileNo) {
    return res.status(400).send({
      error: "MobileNo is required.",
    });
  }
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).send({
      error: "Email is taken.",
    });
  }

  if (mobileNo) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verifications.create({
        to: `+${mobileNo}`,
        channel: "sms",
      })
      .then((data) => {
        res.status(200).send({
          message: "Verification is sent!!",
          phonenumber: mobileNo,
          data,
        });
      });
  } else {
    res.status(400).send({
      message: "Wrong phone number :(",
      phonenumber: mobileNo,
      data,
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { name, email, password, mobileNo, code } = req.body;

  if (mobileNo && code) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: `+${mobileNo}`,
        code: code,
      })
      .then(async (data) => {
        if (data.status === "approved") {
          try {
            //hashPassword
            const hashedPassword = await hashPassword(password);
            const user = new User({
              name,
              email,
              password: hashedPassword,
              mobileNo,
            });
            // save user to DB
            await user.save();
            return res.status(200).send({
              message: "User is registred & Verified!!",
              data,
            });
          } catch (error) {
            return res.status(400).send({
              error: "Sorry ,something went wrong. Try again.",
            });
          }
        }
      });
  } else {
    res.status(400).send({
      message: "Wrong phone number or code :(",
      phonenumber: mobileNo,
      data,
    });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if the email exist in our database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        error: "User not found. Try again.",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(400).send({
        error: " Wrong password. Try again.",
      });
    }
    //create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;

    res.json({ token, user });
  } catch (error) {
    return res.status(400).send({
      error: "Sorry ,something went wrong. Try again.",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({
      error: "Email is required",
    });
  }
  // transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      error: "we can't a user with this email",
    });
  }
  // secret
  const secret = nanoid(8);

  await User.findByIdAndUpdate(user._id, { secret: secret });

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Forget password",
    html: `
    <center><h1>Your secret code to reset password</h1></center>
    <hr/>
    <center><strong><h1>${secret}</h1><strong></center>
    `,
  };
  try {
    await transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        return res.json({
          error,
        });
      }
      return res.json({
        success: "Email sent!!!",
      });
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const resetPassword = async (req, res) => {
  const { email, secret, newPassword } = req.body;

  // validation
  if (!email) {
    return res.status(400).send({
      error: "Email is required",
    });
  }
  if (!secret) {
    return res.status(400).send({
      error: "Secret is required",
    });
  }
  if (!newPassword) {
    return res.status(400).send({
      error: "New password is required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({
      error: "we can't find a user with this email",
    });
  }

  const match = user.secret;

  if (match !== secret) {
    return res.status(400).send({
      error: "the secret code is wrong",
    });
  }

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).send({
      error: "New password is required and should be at least 6 character long",
    });
  }
  const hashed = await hashPassword(newPassword);
  try {
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats you reset password.",
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

// get profile
export const getUserProfile = async (req, res) => {
  const userId = req.body._id;
  if (!userId) {
    return res.status(400).send({
      error: "user Id is required",
    });
  }
  try {
    const user = await User.findOne({ userId });
    res.json(user);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
// update profile
export const updateProfile = async (req, res) => {
  try {
    const data = {};

    if (req.body.status) {
      data.status = req.body.status;
    }

    if (req.body.medical) {
      data.medical = req.body.medical;
    }

    let user = await User.findByIdAndUpdate(req.body._id, data, { new: true });
    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

//  addNotification

export const addNotification = async (req, res) => {
  const { notification, _id } = req.body;
  if (!notification) {
    return res.status(400).send({
      error: "notification is required",
    });
  }
  if (!_id) {
    return res.status(400).send({
      error: "user Id is required",
    });
  }
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { $push: { notifications: { notification } } },
      { new: true }
    );
    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

// addFavouriteVideos

export const addFavouriteVideos = async (req, res) => {
  const { title, description, image, _id } = req.body;
  if (!title) {
    return res.status(400).send({
      error: "title is required",
    });
  }
  if (!description) {
    return res.status(400).send({
      error: "description is required",
    });
  }
  if (!image) {
    return res.status(400).send({
      error: "image is required",
    });
  }
  if (_id) {
    return res.status(400).send({
      error: "user Id is required",
    });
  }
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { $push: { favouriteVideos: { title, description, image } } },
      { new: true }
    );
    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
