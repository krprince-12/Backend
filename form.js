
// const express = require('express');
// const app = express();

// // Middleware to parse form data
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.json()); // for parsing application/json

// // Serve the form on the root route
// app.get('/', (req, res) => {
//   res.send(`
//     <form action="/submit" method="POST">
//       <input type="text" name="username" placeholder="Username" required>
//       <button type="submit">Submit</button>
//     </form>
//   `);
// });

// // Handle the form submission
// app.post('/submit', (req, res) => {
//   const { username } = req.body;
//   res.send(`Form submitted! Username: ${username}`);
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/formdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema and model
const UserSchema = new mongoose.Schema({
  username: String
});

const User = mongoose.model('User', UserSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for serving form
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { username } = req.body;

  // Create a new user document and save to the database
  const user = new User({ username });
  user.save()
    .then(() => res.send(`Form submitted! Username: ${username}`))
    .catch((err) => res.send('Failed to save data.'));
});

// Route to view stored data
app.get('/data', (req, res) => {
  User.find().then(users => {
    const usernames = users.map(user => user.username).join(', ');
    res.send(`Stored Usernames: ${usernames}`);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
