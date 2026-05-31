// 1. Import Express and create a router
const express = require('express');
const router = express.Router();

// 2. Import our custom security middleware and the Machine model
const auth = require('../middleware/auth');
const Machine = require('../models/Machine');

/**
 * ROUTE 1: GET ALL AVAILABLE MACHINES
 * Path: GET /api/machines
 * Who can access: Anyone (Public)
 */
router.get('/', async (req, res) => {
  try {
    // Find ALL machines in the database where 'isAvailable' is true.
    // .populate() gets the name of the owner from the User database using their ownerId.
    const machines = await Machine.find({ isAvailable: true }).populate('ownerId', ['name']);
    
    // Send the list of machines back to the React frontend
    res.json(machines);
    
  } catch (err) {
    console.error("Error fetching machines:", err.message);
    res.status(500).send('Server error');
  }
});

/**
 * ROUTE 2: POST A NEW MACHINE FOR RENT
 * Path: POST /api/machines
 * Who can access: Only logged-in farmers (Private)
 */
// The 'auth' middleware ensures only logged-in users get past this point
router.post('/', auth, async (req, res) => {
  
  // Security Check: Only farmers can list machines for rent
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ msg: 'Access Denied: Only farmers can list machines.' });
  }
  
  // Extract the machine data sent from the React form
  const { name, type, rentalPricePerDay, imageUrl } = req.body;

  try {
    // Create the new Machine object. We assign the ownerId automatically using the token.
    const newMachine = new Machine({
      name: name,
      type: type,
      rentalPricePerDay: rentalPricePerDay,
      imageUrl: imageUrl,
      ownerId: req.user.id
    });
    
    // Save to MongoDB
    const savedMachine = await newMachine.save();
    
    // Send success response
    res.json(savedMachine);
    
  } catch (err) {
    console.error("Error adding machine:", err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
