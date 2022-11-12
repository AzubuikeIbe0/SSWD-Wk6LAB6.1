// This is the product controller

// Import router package
const router = require('express').Router();

// Import product service 
const searchService = require("../services/searchService.js");

// This endpoint will return a single product data from the database
router.get('/:keyword', async(req, res) => {

  // Try to get data and return it
  try{
    // Get product
    const result = await searchService.searchProducts(req.params.id);
    // Send a response
    res.json(result);

  }catch(err){

    res.status(500);
    res.sendStatus(err.message);
  }

});

// export
module.exports = router;