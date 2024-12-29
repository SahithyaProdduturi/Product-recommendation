// Function to fetch products for a specific category
function fetchProducts(category) {
    fetch(`/${category}`)
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Clear any existing products
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="images/${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>${product.price}</strong></p>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Call the function when the page loads to fetch books
window.onload = function() {
    // Make sure the correct category is being passed
    const category = window.location.pathname.split('/').pop().replace('.html', '');
    fetchProducts(category);
};