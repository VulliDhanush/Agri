// 1. Import Express, the framework we use to build our server API
const express = require('express');

// 2. Create a "router". This acts like a mini-app that only handles routes starting with "/api/products"
const router = express.Router();

// 3. Import our custom security middleware. This function checks if a user is logged in.
const auth = require('../middleware/auth');

// 4. Import the Product model. This represents the "Products" collection in our MongoDB database.
const Product = require('../models/Product');

/**
 * ROUTE 1: GET ALL PRODUCTS
 * Path: GET /api/products
 * Who can access: Anyone (Public)
 */
router.get('/', async (req, res) => {
  try {
    // Step 1: Ask the database to find ALL products.
    // The .populate() part tells MongoDB: "Don't just give me the farmerId, go find that farmer's 'name' and bring it too!"
    const products = await Product.find().populate('farmerId', ['name']);
    
    // Step 2: Send the list of products back to the frontend (React) as JSON data.
    res.json(products);
    
  } catch (err) {
    // If anything goes wrong, log the error in the server console and send a 500 (Server Error) status back
    console.error("Error fetching products:", err.message);
    res.status(500).send('Server error');
  }
});

/**
 * ROUTE 2: ADD A NEW PRODUCT
 * Path: POST /api/products
 * Who can access: Only logged-in users who are 'farmers' (Private)
 */
// Notice we put 'auth' as the second argument. This means the request MUST pass the auth check before running our code.
router.post('/', auth, async (req, res) => {
  
  // Step 1: Security Check. The 'auth' middleware already verified they are logged in and attached their info to req.user.
  // Now we check if their role is actually 'farmer'. If not, we stop them here and send a 403 Forbidden error.
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ msg: 'Access Denied: Only farmers can add products.' });
  }
  
  // Step 2: Extract the data the user sent from the frontend.
  // req.body contains the JSON data sent from the React app.
  const { name, description, price, isOrganic, stock, imageUrl } = req.body;

  try {
    // Step 3: Create a new Product object in memory using the data they sent.
    // We also automatically attach the farmerId by getting it from the logged-in user (req.user.id).
    const newProduct = new Product({
      name: name,
      description: description,
      price: price,
      isOrganic: isOrganic,
      stock: stock,
      imageUrl: imageUrl,
      farmerId: req.user.id
    });
    
    // Step 4: Save this new product to the MongoDB database permanently.
    const savedProduct = await newProduct.save();
    
    // Step 5: Send the newly created product back to the frontend to confirm success.
    res.json(savedProduct);
    
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).send('Server error');
  }
});

// Finally, we export this router so our main server file can use it.
module.exports = router;
