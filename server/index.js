const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/userModel');
const DataModel = require('./models/dataModel');

const PORT = 8000;
const mongoDBURL = 'mongodb+srv://root:root@cluster0.rzbua.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
app.use(cors());
app.use(express.json());

// REGISTER NEW USER
app.post('/add-user', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Send all required fields' });
    }

    const newUser = await User.create({ name, email, password });
    return res.status(201).send(newUser);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// CHECK IF EMAIL EXISTS
app.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    return res.status(200).json({ message: 'Email is available' });
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// FIXED LOGIN ROUTE
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    if (user.password === password)
      return res.status(200).json({ username: user.name });
    else
      return res.status(401).json({ message: 'Invalid password' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// FETCH ALL USERS
app.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// UPLOAD EXCEL DATA TO DB
app.post('/upload-data', async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty data format' });
    }

    const inserted = await DataModel.insertMany(data);
    res.status(200).json({ message: 'Data added successfully', insertedCount: inserted.length });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Failed to add data to the database' });
  }
});

// GET EXCEL DATA IN DB
app.get('/all-data', async (req, res) => {
  try {
    const allData = await DataModel.find({});
    res.status(200).json({ data: allData });  // or { data: allData }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

// CONNECT TO DB AND START SERVER
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('App connected to Database');
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
