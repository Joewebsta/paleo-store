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
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const para = document.createElement('p');
    const image = document.createElement('img');

    section.className = product.type;
    heading.textContent = product.name[0].toUpperCase() + product.name.slice(1);
    para.textContent = `$${product.price.toFixed(2)}`;
    image.src = objectURL;
    image.alt = product.name;

    productContainer.append(section);
    section.append(heading);
    section.append(para);
    section.append(image);
  }
}