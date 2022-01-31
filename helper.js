//import required packages
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { client } from "./index.js";
import { ObjectId } from "mongodb";

// generate hashedpassword for the password
async function genPassword(password) {
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function createUser(
  fname,
  lname,
  username,
  email,
  hashedPassword,
  passwordConfirmation
) {
  return await client.db("music").collection("users").insertOne({
    fname,
    lname,
    username,
    email,
    password: hashedPassword,
    passwordConfirmation,
    Status: "InActive",
    token: "",
  });
}

async function getUser(userData) {
  return await client.db("music").collection("users").findOne(userData);
}

async function getUserByEmail(email) {
  return await client.db("music").collection("users").findOne({ email });
}

async function getUserById(id) {
  return await client
    .db("music")
    .collection("users")
    .findOne({ _id: ObjectId(id) });
}

async function updateUser(email, token) {
  return await client
    .db("music")
    .collection("users")
    .updateOne({ email }, { $set: { token: token } });
}

async function UpdateUserById(id, data) {
  return await client.db("music").collection("users").updateOne({ _id: ObjectId(id) }, { $set: data });
}

async function deleteUserById(id) {
  return await client.db('music').collection('users').deleteOne({ _id: ObjectId(id) });
}

//Mail function for sending the Mail messages
function Mail(email, res, message) {
  const mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: "Mail From URL Shortener",
    html: message,
  };

  mail.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Mail", err);
      res.status(404).send("error");
    } else {
      console.log("Mailstatus :", info.response);
      res.send("Mail Sent For verification");
    }
  });
}

export {
  genPassword,
  Mail,
  getUser,
  createUser,
  updateUser,
  getUserByEmail,
  getUserById,
  UpdateUserById,
  deleteUserById
};
