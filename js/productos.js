document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Obtener productos desde la API
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            // Iterar sobre los productos y agregarlos al DOM
            products.forEach(product => {
                // Crear un contenedor para cada producto
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                // Crear el contenido del producto
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p><strong>Precio:</strong> $${product.price}</p>
                `;

                // Añadir el producto a la lista
                productList.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productList.innerHTML = '<p>Hubo un error al cargar los productos.</p>';
        });
});
