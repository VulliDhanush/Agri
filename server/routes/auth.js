// 1. Import Express and create a router to handle our authentication paths
const express = require('express');
const router = express.Router();

// 2. Import security libraries
// bcryptjs is used to scramble (hash) passwords so they aren't saved as plain text
const bcrypt = require('bcryptjs');
// jsonwebtoken (JWT) creates digital "ID cards" so users stay logged in securely
const jwt = require('jsonwebtoken');

// 3. Import our custom security middleware and the User database model
const auth = require('../middleware/auth');
const User = require('../models/User');

/**
 * ROUTE 1: REGISTER A NEW USER
 * Path: POST /api/auth/register
 * Who can access: Anyone (Public)
 */
router.post('/register', async (req, res) => {
  // Step 1: Extract data sent from the frontend registration form (req.body)
  const { name, email, password, role } = req.body;
  
  try {
    // Step 2: Check if a user with this email already exists in the database
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists with this email.' });
    }

    // Step 3: Create a new User object in memory (it's not saved to the DB yet!)
    user = new User({ 
      name: name, 
      email: email, 
      password: password, 
      role: role 
    });

    // Step 4: Hash the password for security before saving it
    // "genSalt" adds random data to make the password hash even harder to crack
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    // Step 5: Save the new user into the database permanently
    await user.save();

    // Step 6: Create the JWT (The digital ID card)
    // We only put non-sensitive info in the token (like their ID and role)
    const payload = { 
      user: { 
        id: user.id, 
        role: user.role 
      } 
    };
    
    // Sign the token with our secret key so nobody else can fake it
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      // Send the token and user info back to the frontend to complete the login
      res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    });
    
  } catch (err) {
    console.error("Error in registration:", err.message);
    res.status(500).send('Server error');
  }
});

/**
 * ROUTE 2: LOGIN A USER
 * Path: POST /api/auth/login
 * Who can access: Anyone (Public)
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Step 1: Look for the user in the database by their email
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials (Email not found)' });
    }

    // Step 2: Check if the password they typed matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials (Wrong password)' });
    }

    // Step 3: If everything matches, generate a JWT token just like we did in registration
    const payload = { 
      user: { 
        id: user.id, 
        role: user.role 
      } 
    };
    
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    });
    
  } catch (err) {
    console.error("Error in login:", err.message);
    res.status(500).send('Server error');
  }
});

/**
 * ROUTE 3: GET LOGGED-IN USER INFO
 * Path: GET /api/auth/me
 * Who can access: Only logged-in users (Private)
 */
// Because we put the 'auth' middleware here, this route will ONLY run if they have a valid token
router.get('/me', auth, async (req, res) => {
  try {
    // Look up the user by the ID saved inside their token (which auth middleware put in req.user.id)
    // The .select('-password') means: "Get everything EXCEPT the password field for safety"
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    
  } catch (err) {
    console.error("Error fetching user data:", err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
