const socket = io();

const productList = document.getElementById('product-list');
const addProductForm = document.getElementById('add-product-form');

socket.on('products', (products) => {
  productList.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');
    li.setAttribute('data-id', product.id);
    li.innerHTML = `${product.title} - $${product.price} <button onclick="deleteProduct('${product.id}')">Eliminar</button>`;
    productList.appendChild(li);
  });
});

addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const price = parseFloat(document.getElementById('price').value);
  const id = Date.now().toString();
  socket.emit('addProduct', { id, title, price });
  addProductForm.reset();
});

window.deleteProduct = function(id) {
  socket.emit('deleteProduct', id);
};