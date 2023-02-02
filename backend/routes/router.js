const express = require("express");
const nodemailer = require("nodemailer");
const router = new express.Router();
const users = require("../models/model");

//email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

//resister user details
router.post("/register", async (req, res) => {
  const { name, email, phone, message } = req.body;
  // const data=new users.

  if (!name || !email || !phone) {
    res.status(401).json({ status: 401, error: "please Enter All Data" });
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      const userMessage=await preuser.Messagesave(message);
      console.log(userMessage)
      const maileroption = {
        from: process.env.EMAIL,
        to: email,
        subject: "contact US",
        text: "Your response has been submited at sachin sangwan shivcoder Database",
      };
      transporter.sendMail(maileroption, (error, info) => {
        if (error) {
          console.log("error occur"+ error);
          // res.status(401).json({status:401,text:"Error Occur"})
        } else {
          console.log("Email Sent"+ info.response);
          res.status(201).json({ status: 201, message: "Mail sent Succesfuly" });
        }
        //  res.status(201).json({status:201,message:"Mail sent Succesfuly"})
      });
    } else {
      const newuser = new users({
        name,
        email,
        phone,
        message,
      });
      const storeData = await newuser.save();
      const maileroption = {
        from: process.env.EMAIL,
        to: email,
        subject: "contact US",
        text: "Your response has been submited at sachin sangwan shivcoder Database",
      };
      transporter.sendMail(maileroption, (error, info) => {
        if (error) {
          console.log("error occur"+ error);
          // res.status(401).json({status:401,text:"Error Occur"})
        } else {
          console.log("Email Sent"+ info.response);
          res.status(201).json({ status: 201, message: "Mail sent Succesfuly" });
        }
        //  res.status(201).json({status:201,message:"Mail sent Succesfuly"})
      });
      res.status(201).json({ status: 201,storeData });
    }
  
  } catch (error) {
    res.status(401).json({ status: 401, error: "please Enter All Data" });
    console.log("catch the error", error);
  }
  console.log(req.body);
});

module.exports = router;
