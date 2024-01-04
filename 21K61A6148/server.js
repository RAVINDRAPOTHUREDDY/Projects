const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection string
const mongoURI = 'mongodb://127.0.0.1:27017/48';

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Connected to MongoDB');

  // Specify the database and collection
  const db = client.db('48');
  const collection = db.collection('bookings');

  // Endpoint to handle form submissions
  app.post('/submitBooking', (req, res) => {
    const bookingData = {
      name: req.body.name,
      email: req.body.email,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      roomType: req.body.roomType
    };

    // Insert the booking data into MongoDB
    collection.insertOne(bookingData, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Booking submitted:', result.ops[0]);
        res.status(200).send('Booking submitted!');
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
