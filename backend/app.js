const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect.js");
const authRoute = require("./routes/auth.js")

const app = express();
const port = 1337;

connectDB()

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use('/', authRoute);
app.use(cors({origin: true}));

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


  app.listen(port, () => {
    console.log("Server is up on port 1337");
  });
