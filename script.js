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
  const filterBtn = document.querySelector('button');
  const productContainer = document.querySelector('.product-container');

  let lastMacro = macroSelect.value;
  let lastSearch = '';
  let macroGroup;
  let finalGroup;

  finalGroup = products;
  updateDisplay();

  macroGroup = []; //necessary?
  finalGroup = []; //necessary?

  filterBtn.addEventListener('click', selectMacro);

  function selectMacro(e) {
    e.preventDefault();

    if ((lastMacro === macroSelect.value) && lastSearch === searchTerm.value.trim()) return;

    lastMacro =  macroSelect.value;
    lastSearch = searchTerm.value.trim();

    if (macroSelect.value === 'All') {
      macroGroup = products;
      selectProducts();
    } else {
      let lowerCaseMacroSelect = macroSelect.value.toLowerCase();
      macroGroup = products.filter(product => product.type === lowerCaseMacroSelect);  
      selectProducts();
    }
  }

  function selectProducts() {
    if(searchTerm.value.trim() === '') {
      finalGroup = macroGroup;
      updateDisplay();
    } else {
      finalGroup = macroGroup.filter(product => product.name === searchTerm.value.toLowerCase().trim());
      updateDisplay();
    }
  } 

  function updateDisplay() {
    while(productContainer.firstChild) {
      productContainer.firstChild.remove();
    }
    
    finalGroup.forEach(product => {
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