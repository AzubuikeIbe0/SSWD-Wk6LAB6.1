// This is the product controller

// Import router package
const router = require('express').Router();

// Import product service 
const productService = require("../services/productService.js");

// This endpoint will return all product data from the database
router.get('/', async(req, res) => {

    // set content type of response body in the headers
    // As this is defined globally in app.js it can be ommitted from here
    res.setHeader('Content-Type', 'application/json');


    // Get result from the product service
    const result = await productService.getProducts()

    // Send a  response - this app will be a web api so no need to send HTML
    res.json(result);

});

// This endpoint will return a single product data from the database
router.get('/:id', async(req, res) => {

  // Try to get data and return it
  try{
    // Get product
    const result = await productService.getProductById(req.params.id);
    // Send a response
    res.json(result);

  }catch(err){

    res.status(500);
    res.sendStatus(err.message);
  }

});

// export
module.exports = router;