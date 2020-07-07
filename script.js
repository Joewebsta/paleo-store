fetch('products.json').then((response) => {
  return response.json();
}).then((json) => {
  const products = json;
  initialize(products);
}).catch((error) => {
  console.log(`Fetch error: ${error.message}`)
})

function initialize(products) {
  const macroSelect = document.querySelector('#macro');
  const searchTerm = document.querySelector('#searchTerm');
  const productContainer = document.querySelector('.product-container');


  // 
}