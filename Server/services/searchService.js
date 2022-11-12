// Product  search service functions

// Import dependencise dataAccess
const searchData = require('../dataAccess/searchData');

    
    async function searchProducts() {
    
      // a place holder for now 
      const searchProducts = await searchData.searchProducts();
    
      // return Categories
      return searchProducts;
    }
    
  
// Module exports
// expose these functions
module.exports = {
  searchProducts
};