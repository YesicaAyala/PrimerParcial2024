document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Función para cargar y mostrar productos
    function loadProducts(category = '') {
        let url = 'https://fakestoreapi.com/products';
        
        // Si hay una categoría seleccionada, modificar la URL para filtrar
        if (category) {
            url += `/category/${category}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(products => {
                // Limpiar el contenedor de productos
                productList.innerHTML = '';
                
                // Iterar sobre los productos y agregarlos al DOM
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');

                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}" class="product-image">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p><strong>Precio:</strong> $${product.price}</p>
                    `;

                    productList.appendChild(productCard);
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                productList.innerHTML = '<p>Hubo un error al cargar los productos.</p>';
            });
    }

    // Cargar todos los productos al inicio
    loadProducts();

    // Añadir evento a los botones para filtrar por categoría
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            loadProducts(category);
        });
    });
});

