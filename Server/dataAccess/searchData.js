// Data access functions for products

// Import dependencies
const { PrismaClient } = require('@prisma/client');

// declare an instance of the client
const prisma = new PrismaClient();

// Get all products from DB
//

//  FULL TEXT SEARCH FUNCTIONALITY



// Data access functions for search products
async function fetchProduct(search) {
    if (!search) {
      try {
        // fetch all todos
        const res = await fetch("/product");
        const data = await res.json();
        // place fetched todos in DOM
        syncDOM(data);
      } catch (err) {
        console.error("Couldn't get products");
      }
    } else {
      try {
        // get todos based on search
        const res = await fetch("product/search?q=" + search.trim());
        const data = await res.json();
        // place fetched todos in DOM
        syncDOM(data);
      } catch (err) {
        console.error("Couldn't get search");
      }
    }
   }


   function syncDOM(data = []) {
    // select todo ul element and replace its child elements with elements created with passed in data
    const elemContainer = document.querySelector(".products");
    const liElements = data.map(todo => Object.assign(document.createElement("li"), { textContent: todo.body }));
    elemContainer.replaceChildren(...liElements);
   }
   
   const form = document.querySelector("form");
   form.addEventListener("submit", (e) => {
    e.preventDefault();
    // get search input element
    const searchQuery = form.querySelector("[name=search]");
    // fetch todos using query
    fetchTodo(searchQuery?.value);
   });
   
   // initialize app
   fetchProduct();
   
   





// Export 
module.exports = {
    fetchProduct
};
