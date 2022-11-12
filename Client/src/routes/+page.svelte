<script>
        // import from the store
        import {products, categories, getAllProducts} from '../stores/productStore.js';

    
         // filtered is subscribed to the $products store
          // initially filtered is a copy of products (from the store)
          $: filtered = $products;


        // This function will filter products by cat_id
        const filterByCat = async (cat_id = 0) => {
          // Refresh the store to ensure it is up to date (optional)
          await getAllProducts();

          // Filter if we hava a cat_id value > 0
          // See https:javascript.infor/array_methods#filter
          // Note this filters the existing $product store and does not replace it like getAllProducts()

          if (cat_id > 0) {
            filtered = $products.filter(p=> {return p.category_id == cat_id});
          }
        }
//  SEARCH FUNCTON

//  I MODIFIED THIS FUNCTION IS FROM W3SCHOOLS.COM 
//  https://www.w3schools.com/howto/howto_js_filter_lists.asp


    function SearchProduct(){
    
    let input, filter, table, rows, rowText, i, txtValue;

    table = document.getElementById("myTable");
    // @ts-ignore
    rows = table.rows;
    input = document.getElementById("myInput");
    // @ts-ignore
    filter = input.value.toUpperCase();



    for (i = 1; i < rows.length - 1; i++) {

      rowText = rows[i].getElementsByTagName('TD')[1];

        txtValue = rowText.innerHTML;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";
        }
    }
}


  /**
  I MODIFIED THIS FUNCTION IS FROM W3SCHOOLS.COM 
  https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table 

	*/
 function sortTable(n=0) {
 let table, rows, switching, i, x, y, yText, xText, shouldSwitch, dir, switchcount = 0;

  table = document.getElementById("myTable");

  switching = true;

  //Set the sorting direction to ascending:
  dir = "asc";

  /* Make a loop that will continue until no switching has been done:*/
  while (switching) {

    //start by saying: no switching is done:
    switching = false;

    // @ts-ignore
    rows = table.rows;

    /*Loop through all table rows (except the first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {

      //start by saying there should be no switching:
      shouldSwitch = false;

      /*Get the two elements you want to compare, one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];

      y = rows[i + 1].getElementsByTagName("TD")[n];


      // I MOFIFIED THIS CODE FROM STACKOVERLOW
      // https://stackoverflow.com/questions/48795284/javascript-column-sort-for-currency-on-html-table

      if (n == 1 || n == 2) {
        xText = x.innerHTML.toLowerCase();
        yText = y.innerHTML.toLowerCase();
      } 
      else if (n == 3) {
        xText = Number(x.innerHTML);
        yText = Number(y.innerHTML);
      }
      else {
        xText = parseFloat(x.innerHTML.split('€')[1].replace(/,/g, ''));
        yText = parseFloat(y.innerHTML.split('€')[1].replace(/,/g, ''));
      }

      /*check if the two rows should switch place, based on the direction, asc or desc:*/
      if (dir == "asc") {

        if ( xText > yText) {

          //if so, mark as a switch and break the loop:
          shouldSwitch = true;

          break;
        }
      } else if (dir == "desc") {

        if ( xText < yText) {

          //if so, mark as a switch and break the loop:
          shouldSwitch = true;

          break;
        }
      }
    }
    if (shouldSwitch) {

      /*If a switch has been marked, make the switch and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);

      switching = true;

      //Each time a switch is done, increase this count by 1:
      switchcount++;

    } else {

      /*If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {

        dir = "desc";
        
        switching = true;
      }
    }
  }
}






       
</script>
<!-- ADDED THE IMPORT STATEMENT ABOVE -->
<!-- Main Content - Products etc. -->
    <div class="container">
      <div class="row">
        <!-- Page Header -->
        <h2 class="mt-5">Products from API</h2>

        <input type="text" id="myInput" on:keyup={()=> SearchProduct()} placeholder="Search for names.." title="Type in a name">
      </div>

      <section class="search">
        <h1 class="title">Full-Text Search</h1>
       <form action="#">
         <input
           type="search"
           name="search"
           id="search"
           placeholder="Enter search..."
         />
         <button type="submit">Search</button>
       </form>
       <ul class="products"></ul>
      </section>
      <div class="row">
        <div class="col-sm-2">
          <!-- Page Body Left Column (menu) -->
          <div id="categoryList" class="list-group">
            <!-- placeholders - replace with real category links -->
            <!-- IMPLEMENTED THE ONCLICK METHODS BELOW -->
            <button on:click={()=> filterByCat()}
                class="category-link list-group-item list-group-item-action">
                All Products
            </button>
            <!-- Add a link for each category -->
            {#each $categories as cat}
            <button on:click={()=> filterByCat(cat.id)}
                class="category-link list-group-item list-group-item-action">
                {cat.category_name}
            </button>
            {/each}
          </div>
        </div> <!-- End category col -->
        <div class="col-sm-10">
          <!-- Page Body Right Side (Content goes here) -->
          <div id="products">
            <table id="myTable" class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th on:click={()=> sortTable(1)}>name</th>
                  <th on:click={()=> sortTable(2)}>description</th>
                  <th on:click={()=> sortTable(3)}>stock</th>
                  <th on:click={()=> sortTable(4)}>price</th>
                </tr>
                
              </thead>
              <tbody id="productRows">
                <!-- ADDED THE PRODUCT DISPLAY TABLE BODY BELOW -->
                <!-- Product Rows to be inserted here -->
                {#each filtered as product}
                <tr>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_description}</td>
                  <td>{product.product_stock}</td>
                  <td class="price">&euro;{Number(product.product_price).toFixed(2)}</td>
                </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div> <!-- End Product col -->
      </div> <!-- End Row -->
    </div> <!-- End Main Content-->