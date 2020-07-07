fetch('products.json').then(response => {
  return response.json();
}).then(json => {
  const products = json;
  initialize(products);
}).catch(error => {
  console.log(`Fetch error: ${error.message}`)
})

function initialize(products) {
  const macroSelect = document.querySelector('#macro');
  const searchTerm = document.querySelector('#searchTerm');
  const productContainer = document.querySelector('.product-container');

  let finalGroup;
  // finalGroup = products; WHY EXACTLY DO I NEED TO DO THIS?
  updateDisplay();


  function updateDisplay() {
    products.forEach(product => {
      fetchBlob(product);
    })
  }

  function fetchBlob(product) {
    url = `images/${product.image}`;

    fetch(url).then(response => {
      return response.blob();
    }).then(blob => {
      let objectURL = URL.createObjectURL(blob);
      showProduct(objectURL, product);
    })
  }

  function showProduct(objectURL, product) {
    const headerText = product.name[0].toUpperCase() + product.name.slice(1);
    
    const productHTML = `
    <section class="${product.type}">
      <h2>${headerText}</h2>
      <p>$${product.price.toFixed(2)}</p>
      <img src="${objectURL}" alt="${product.name}">
    </section>`

    productContainer.innerHTML += productHTML;
  }
}