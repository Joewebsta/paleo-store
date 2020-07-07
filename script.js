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

  const selectedMacro = macroSelect.value;

  function displayProducts(products) {

    products.forEach(product => {
      const section = document.createElement('section');
      const h2 = document.createElement('h2');
      const p = document.createElement('p');
      const img = document.createElement('img');

      section.className = product.type;
      h2.textContent = product.name;
      p.textContent = `$${product.price}`;
      img.src = `images/${product.image}`

      productContainer.append(section);
      section.append(h2);
      section.append(p);
      section.append(img);
    })
  }

  displayProducts(products)

  // 
}