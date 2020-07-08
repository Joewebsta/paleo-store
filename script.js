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
  updateDisplay(products);

  function selectMacro(e, products) {
    e.preventDefault();

    if ((lastMacro === macroSelect.value) && (lastSearch === searchTerm.value.trim())) return;

    lastMacro = macroSelect.value;
    lastSearch = searchTerm.value.trim();

    if (macroSelect.value === 'All') {
      selectProducts(products);
    } else {
      let lowerCaseMacroSelect = macroSelect.value.toLowerCase();
      macroGroup = products.filter(product => product.type === lowerCaseMacroSelect);
      selectProducts(macroGroup);
    }
  }

  function selectProducts(macroGroup) {
    if (searchTerm.value.trim() === '') {
      updateDisplay(macroGroup);
    } else {
      finalGroup = macroGroup.filter(product => {
        const currentSearchTerm = searchTerm.value.toLowerCase().trim();
        return product.name.indexOf(currentSearchTerm) !== -1;
      });
      updateDisplay(finalGroup);
    }
  }

  function updateDisplay(finalGroup) {
    productContainer.textContent = "";

    if (finalGroup.length) {
      finalGroup.forEach(product => fetchBlob(product));
    } else {
      const message = `<p>No products found!</p>`;
      productContainer.innerHTML = message;
    }
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

  filterBtn.addEventListener('click', (e) => {
    selectMacro(e, products)
  });
}