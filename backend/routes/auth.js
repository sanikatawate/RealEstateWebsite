require("dotenv").config();
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

router.post('/signup', [
  body('username', "Min length of name is 3").isLength({min:3}),
  body('email', "Email cannot be empty").isEmail(),
  body('password', "Min length of password is 3").isLength({min:6}),
  body('cnfpassword', "Min length of confirm password is 3").isLength({min:6})
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);

  // If there are validation errors, return bad request and the errors
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  // Check whether the user with this email already exists
  try {
    let userEmail = await User.findOne({email: req.body.email})
    if(userEmail){
      return res.status(400).json({error: "Sorry, a user with this email already exists"})
    }

    if(req.body.password!=req.body.cnfpassword){
      return res.status(400).json({error: "Enter correct password"})
    }

    // Hashing Passwords using bcryptjs, Salt and pepper
    const salt = await bcrypt.genSalt(10);
    const hashedPasskey = await bcrypt.hash(req.body.password, salt);

    // Create new user Instance
    const userInstance = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPasskey
    });

    const data = {
      user:{
      id: userInstance._id
    }}
    
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success=true;
    res.status(200).json({success, authtoken});

  } catch (error) {
      console.log(error.message)
      // res.json({message: err.message})
  }
});



router.post('/login', [
  body('username').isLength({min:3}),
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);

  // If there are validation errors, return bad request and the errors
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  try {
    // Check for valid email
    const userInstance = await User.findOne({ email: req.body.email });
    if(!userInstance){
      return res.status(400).json({error: "Invalid Email"})
    }
    if(userInstance.username!=req.body.username){
      return res.status(400).json({error: "Invalid Username"})
    }

    // Check for valid password
    const passwordCompare = await bcrypt.compare(req.body.password, userInstance.password);
    console.log(passwordCompare)
    if(!passwordCompare){
      return res.status(400).json({error: "Invalid Password"})
    }

    // if (userInstance.password === req.body.password) {
    //   return res
    //     .status(200)
    //     .json({ success: true, message: 'Login Successful' });
    // } else {
    //   res.status(401).json({ success: false, message: 'Login Failed' });
    // }

    const data = {
      user:{
      id: userInstance._id
    }}
    
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success=true;
    res.status(200).json({success, authtoken});
    
  } catch (error) {
    console.log(error.message);
    res.send(error);
  }
});



// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
// router.post('/getuser', fetchuser,  async (req, res) => {

//   try {
//     userId = req.user.id
//     const user = await User.findById(userId).select("-password")
//     res.send(user)
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// })

module.exports = router;
