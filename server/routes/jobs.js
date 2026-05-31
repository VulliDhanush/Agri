// 1. Import Express and create a router
const express = require('express');
const router = express.Router();

// 2. Import our custom security middleware and the Job model
const auth = require('../middleware/auth');
const Job = require('../models/Job');

/**
 * ROUTE 1: GET ALL OPEN JOBS
 * Path: GET /api/jobs
 * Who can access: Anyone (Public)
 */
router.get('/', async (req, res) => {
  try {
    // Ask the database to find ALL jobs where 'isOpen' is true.
    // The .populate() command also grabs the 'name' of the farmer who posted it.
    const jobs = await Job.find({ isOpen: true }).populate('farmerId', ['name']);
    
    // Send the jobs data back to the React app
    res.json(jobs);
    
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).send('Server error');
  }
});

/**
 * ROUTE 2: POST A NEW JOB
 * Path: POST /api/jobs
 * Who can access: Only logged-in farmers (Private)
 */
// The 'auth' middleware checks if they are logged in first
router.post('/', auth, async (req, res) => {
  
  // Security Check: Make sure only farmers can post a job
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ msg: 'Access Denied: Only farmers can post jobs.' });
  }
  
  // Extract the data sent from the React form
  const { title, description, wage, location } = req.body;

  try {
    // Create a new Job object in memory. 
    // We get the farmerId from the token (req.user.id) so nobody can fake who posted it.
    const newJob = new Job({
      title: title,
      description: description,
      wage: wage,
      location: location,
      farmerId: req.user.id
    });
    
    // Save the new job to the MongoDB database
    const savedJob = await newJob.save();
    
    // Send the saved job back to the frontend
    res.json(savedJob);
    
  } catch (err) {
    console.error("Error posting job:", err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
