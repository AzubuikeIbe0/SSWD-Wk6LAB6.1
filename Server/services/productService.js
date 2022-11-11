// Product service functions

// Import dependencise dataAccess
const productData = require('../dataAccess/productData');

// Validation
const validate = require('../validators/baseValidators');

// Function to get all products
//
async function getProducts() {
    
    // a place holder for now 
    const products = await productData.getProducts();
  
    // return products
    return products;
  }

  async function getProductById(id) {
    
    // validate the id
    const validatedId = validate.validateId(id);

    if(validatedId) {

      // call the data access function to get the product with matching id
      const product = await productData.getProductById(validatedId);

      // return product
      return product;

    }else{

      return "Invalid product Id";

    }
  
  }
  
// Module exports
// expose these functions
module.exports = {
    getProducts,
    getProductById
};