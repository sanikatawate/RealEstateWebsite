const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./schema.js");

const app = express();

const uri = 'mongodb+srv://sanikatawate30:sanika30@cluster0.w7wpmz8.mongodb.net/estate?retryWrites=true&w=majority';

(async () => {
  await mongoose.connect(uri);
})();

app.use(express.json());
app.use(cors({origin: true}));
app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.get('/list', async (req, res) => {
//   try {
//     const collection = mongoose.connection.client.db('estate').collection('list');
//     const users = await collection.find().toArray();
//     res.send(users);
//   } catch (error) {
//     console.log('Error retrieving users', error);
//     res.status(500).send('Internal server error');
//   }
// });

// app.get('/location', async (req, res) => {
//   try {
//     const collection = mongoose.connection.client.db('estate').collection('location');
//     const users = await collection.find().toArray();
//     res.send(users);
//   } catch (error) {
//     console.log('Error retrieving users', error);
//     res.status(500).send('Internal server error');
//   }
// });

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const userInstance = await User.create(req.body);
  res.status(200).json(userInstance);
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const userInstance = await User.findOne({email: req.body.email});
    console.log("fakhfhka",userInstance.password);
    if (userInstance.password === req.body.password) {
      return res
        .status(200)
        .json({ success: true, message: "Login Successful" });
    }
    res.status(401).json({ success: false, message: "Login Failed" });
  } catch (error) {
    res.send(error);
  }
});

mongoose.connection.on("open", () => {
  app.listen(1337, () => {
    console.log("Server is up on port 1337");
  });
});
