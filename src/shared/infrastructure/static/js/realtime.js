const socket = io();
const productList = document.getElementById("product-list");
const addProductForm = document.getElementById("add-product-form");

socket.on("products", (products) => {
    productList.innerHTML = "";
    
    if (products.length === 0) {
        productList.innerHTML = `
            <div class="no-products">
                <h3>No hay productos</h3>
                <p>Agrega tu primer producto usando el formulario</p>
            </div>
        `;
        return;
    }

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product-item";
        productDiv.setAttribute("data-id", product._id);
        
        productDiv.innerHTML = `
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-details">
                    Categoría: ${product.category} | Stock: ${product.stock} | Código: ${product.code}
                </div>
                <div class="status-indicator ${product.status ? 'status-active' : 'status-inactive'}">
                    ${product.status ? '✅ Activo' : '❌ Inactivo'}
                </div>
            </div>
            <div class="product-price">$${product.price}</div>
            <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">🗑️ Eliminar</button>
        `;
        
        productList.appendChild(productDiv);
    });
});

addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        category: document.getElementById("category").value,
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value),
        status: document.getElementById("status").value === "true",
        thumbnails: document.getElementById("thumbnails").value
            .split('\n')
            .filter(url => url.trim() !== '')
    };

    if (formData.price < 0) {
        alert('El precio no puede ser negativo');
        return;
    }

    if (formData.stock < 0) {
        alert('El stock no puede ser negativo');
        return;
    }

    socket.emit("addProduct", formData);
    
    addProductForm.reset();
    
    alert('Producto agregado exitosamente!');
});

window.deleteProduct = function (id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        socket.emit("deleteProduct", id);
    }
};
