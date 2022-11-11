// Data access functions for products

// Import dependencies
const { PrismaClient } = require('@prisma/client');

// declare an instance of the client
const prisma = new PrismaClient();

// Get all products from DB
//
async function getProducts() {
    // define variable to store products
    let products;

    try {  
        // Get all products
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
        products = await prisma.product.findMany();

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all products: ', err.message);
    } finally {
      // TODO document why this block is empty
    
      
    }
    // return all products found
    return products;
}

// Get single product from DB

async function getProductById(id) {
    // define variable to store products
    let product;

    try {  
        // Get all products
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
        product = await prisma.product.findUnique({
            where: { id: Number(id) }

        });

    // Catch and log errors to server side console 
    } catch (err) {

        console.log('DB Error - get single product: ', err.message);

    } finally {

      // TODO document why this block is empty
       
    }
    // return single product 
    return product;
}


// Export 
module.exports = {
    getProducts,
    getProductById
};
