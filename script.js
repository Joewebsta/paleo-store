fetch('products.json').then( response => {
  return response.json();
}).then( json => {
  const products = json;
  initialize(products);
}).catch( error => {
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
    }).then( blob => {
      let objectURL = URL.createObjectURL(blob);
      showProduct(objectURL, product);
    })
  }

  function showProduct(objectURL, product) {
    console.log(objectURL, product);
  }

  // function displayProducts(products) {

  //   products.forEach(product => {
  //     const section = document.createElement('section');
  //     const h2 = document.createElement('h2');
  //     const p = document.createElement('p');
  //     const img = document.createElement('img');

  //     section.className = product.type;
  //     h2.textContent = product.name;
  //     p.textContent = `$${product.price}`;
  //     img.src = `images/${product.image}`

  //     productContainer.append(section);
  //     section.append(h2);
  //     section.append(p);
  //     section.append(img);
  //   })
  // }
}