// Import the required module
const mongoose = require('mongoose');

// Connect to the MongoDB database (replace 'your_connection_string' with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/hotelManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the bookings
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  checkIn: Date,
  checkOut: Date,
  roomType: String,
});

// Create a model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

function submitForm() {
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const roomType = document.getElementById('roomType').value;

  // Create a new booking instance
  const newBooking = new Booking({
    name: name,
    email: email,
    checkIn: checkIn,
    checkOut: checkOut,
    roomType: roomType,
  });

  // Save the booking to the database
  newBooking.save((err) => {
    if (err) {
      console.error('Error saving booking:', err);
      alert('Error submitting booking. Please try again.');
    } else {
      alert('Booking submitted!');
    }
  });
}
