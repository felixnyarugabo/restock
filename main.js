
// ==================================
// 1. GET HTML ELEMENTS
// ==================================

const deleteProductId = document.getElementById('deleteProductId');
const deleteProductBtn = document.getElementById('deleteProductBtn');
const deleteMessage = document.getElementById('deleteMessage');

const productId = document.getElementById('productId');
const quantity = document.getElementById('quantity');

const sellBtn = document.getElementById('sellBtn');
const restockBtn = document.getElementById('restockBtn');

const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');

const productList = document.getElementById('productList');
const lowStockList = document.getElementById('lowStockList');

const totalProducts = document.getElementById('totalProducts');
const inventoryValue = document.getElementById('inventoryValue');
const lowStockCount = document.getElementById('lowStockCount');

const message = document.getElementById('message');

// Add product elements
const newProductName = document.getElementById('newProductName');
const newProductPrice = document.getElementById('newProductPrice');
const newProductStock = document.getElementById('newProductStock');
const addProductBtn = document.getElementById('addProductBtn');
const addProductMessage = document.getElementById('addProductMessage');


// ==================================
// 2. LOAD PRODUCTS FROM LOCAL STORAGE
// ==================================



const systemName = document.getElementById('systemName');
const systemNameInput = document.getElementById('systemNameInput');
const renameBtn = document.getElementById('renameBtn');
const renameMessage = document.getElementById('renameMessage');

// Load saved system name
const savedSystemName = localStorage.getItem('systemName');

systemName.textContent = savedSystemName || "Inventory Management System";

// Rename system
function renameSystem() {
    const newName = systemNameInput.value.trim();

    if (newName === "") {
        renameMessage.textContent = "Please enter a system name.";
        renameMessage.className = "error";
        return;
    }

    // Update heading
    systemName.textContent = newName;

    // Save name
    localStorage.setItem('systemName', newName);

    renameMessage.textContent = "System name updated successfully!";
    renameMessage.className = "success";

    systemNameInput.value = "";
}

renameBtn.addEventListener('click', renameSystem);


const defaultProducts = [
    { id: 1, name: "Laptop", price: 80000, stock: 1 },
    { id: 2, name: "Phone", price: 25000, stock: 2 },
    { id: 3, name: "Mouse", price: 1200, stock: 20 },
    { id: 4, name: "Keyboard", price: 2500, stock: 13 },
    { id: 5, name: "Monitor", price: 18000, stock: 12 }
];

const savedProducts = localStorage.getItem('products');

const products = savedProducts !== null
    ? JSON.parse(savedProducts)
    : defaultProducts;

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Save initial products on first visit
if (savedProducts === null) {
    saveProducts();
}


// ==================================
// 3. DISPLAY ALL PRODUCTS
// ==================================

function displayProducts() {
    productList.innerHTML = "";

    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product';

        item.textContent =
            `${product.name} | ID: ${product.id} | Price: KSh ${product.price.toLocaleString()} | Stock: ${product.stock}`;

        productList.append(item);
    });
}


// ==================================
// 4. CALCULATE INVENTORY VALUE
// ==================================

function calculateInventoryValue() {
    const value = products.reduce((total, product) => {
        return total + product.price * product.stock;
    }, 0);

    totalProducts.textContent = products.length;

    inventoryValue.textContent =
        `KSh ${value.toLocaleString()}`;
}


// ==================================
// 5. LOW STOCK ALERT
// ==================================

function lowproductstock() {
    lowStockList.innerHTML = "";

    const lowProducts = products.filter(product => product.stock < 4);

    lowStockCount.textContent = lowProducts.length;

    if (lowProducts.length === 0) {
        lowStockList.textContent =
            "Everything is okay. No products need restocking.";
        return;
    }

    lowProducts.forEach(product => {
        const item = document.createElement('p');

        item.className = 'low';

        item.textContent =
            `${product.name}: Only ${product.stock} remaining`;

        lowStockList.append(item);
    });
}


// ==================================
// 6. UPDATE DASHBOARD
// ==================================

function updateDashboard() {
    displayProducts();
    calculateInventoryValue();
    lowproductstock();
}


// ==================================
// 7. DISPLAY MESSAGES
// ==================================

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}


// ==================================
// 8. GET AND VALIDATE INPUTS
// ==================================

function getFormValues() {
    const id = Number(productId.value);
    const amount = Number(quantity.value);

    if (
        productId.value.trim() === "" ||
        quantity.value.trim() === "" ||
        !Number.isInteger(id) ||
        !Number.isInteger(amount) ||
        id <= 0 ||
        amount <= 0
    ) {
        showMessage("Enter a valid product ID and quantity.", "error");
        return null;
    }

    return { id, amount };
}


// ==================================
// 9. FIND PRODUCT BY ID
// ==================================

function getProductById(id) {
    return products.find(product => product.id === id);
}


// ==================================
// 10. SELL PRODUCT
// ==================================

function sellProduct(id, amount) {
    const product = getProductById(id);

    if (!product) {
        showMessage("Product does not exist.", "error");
        return;
    }

    if (product.stock < amount) {
        showMessage("Not enough stock available.", "error");
        return;
    }

    const previousStock = product.stock;

    product.stock -= amount;

    saveProducts();
    updateDashboard();

    showMessage(
        `${product.name}: Stock changed from ${previousStock} to ${product.stock}.`,
        "success"
    );
}


// ==================================
// 11. RESTOCK PRODUCT
// ==================================

function restockProduct(id, amount) {
    const product = getProductById(id);

    if (!product) {
        showMessage("Product does not exist.", "error");
        return;
    }

    const previousStock = product.stock;

    product.stock += amount;

    saveProducts();
    updateDashboard();

    showMessage(
        `${product.name}: Stock changed from ${previousStock} to ${product.stock}.`,
        "success"
    );
}


// ==================================
// 12. SEARCH PRODUCT
// ==================================

function searchProduct(name) {
    searchResult.innerHTML = "";

    const searchTerm = name.trim().toLowerCase();

    if (searchTerm === "") return;

    const foundProduct = products.find(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    if (!foundProduct) {
        searchResult.textContent = "Product not found.";
        return;
    }

    searchResult.textContent =
        `${foundProduct.name} | Price: KSh ${foundProduct.price.toLocaleString()} | Stock: ${foundProduct.stock}`;
}


// ==================================
// 13. ADD NEW PRODUCT
// ==================================

function addProduct() {
    const name = newProductName.value.trim();
    const priceValue = newProductPrice.value.trim();
    const stockValue = newProductStock.value.trim();

    const price = Number(priceValue);
    const stock = Number(stockValue);

    if (
        name === "" ||
        priceValue === "" ||
        stockValue === "" ||
        !Number.isFinite(price) ||
        !Number.isInteger(stock) ||
        price <= 0 ||
        stock < 0
    ) {
        addProductMessage.textContent =
            "Enter valid product details.";
        addProductMessage.className = "error";
        return;
    }

    const id = products.length > 0
        ? Math.max(...products.map(product => product.id)) + 1
        : 1;

    const newProduct = {
        id: id,
        name: name,
        price: price,
        stock: stock
    };

    products.push(newProduct);

    saveProducts();
    updateDashboard();

    addProductMessage.textContent =
        `${name} added successfully! Product ID: ${id}`;

    addProductMessage.className = "success";

    newProductName.value = "";
    newProductPrice.value = "";
    newProductStock.value = "";
}


function deleteProduct(id) {

    // Step 1: Validate ID
    if (!Number.isInteger(id) || id <= 0) {
        deleteMessage.textContent = "Enter a valid product ID.";
        deleteMessage.className = "error";
        return;
    }

    // Step 2: Find the product
    const product = products.find(item => item.id === id);

    // Step 3: Check whether product exists
    if (!product) {
        deleteMessage.textContent = "Product does not exist.";
        deleteMessage.className = "error";
        return;
    }

    // Step 4: Remove product from the array
    const index = products.findIndex(item => item.id === id);

    products.splice(index, 1);

    // Step 5: Save updated array
    saveProducts();

    // Step 6: Refresh dashboard
    updateDashboard();

    // Step 7: Display success message
    deleteMessage.textContent =
        `${product.name} deleted successfully.`;

    deleteMessage.className = "success";

    deleteProductId.value = "";
}



// ==================================
// 14. EVENT LISTENERS
// ==================================


deleteProductBtn.addEventListener('click', () => {

    const id = Number(deleteProductId.value);

    if (deleteProductId.value.trim() === "") {
        deleteMessage.textContent = "Enter a product ID.";
        deleteMessage.className = "error";
        return;
    }

    deleteProduct(id);
});

sellBtn.addEventListener('click', () => {
    const values = getFormValues();

    if (!values) return;

    sellProduct(values.id, values.amount);
});

restockBtn.addEventListener('click', () => {
    const values = getFormValues();

    if (!values) return;

    restockProduct(values.id, values.amount);
});

searchInput.addEventListener('input', () => {
    searchProduct(searchInput.value);
});

addProductBtn.addEventListener('click', addProduct);


// ==================================
// 15. INITIAL DISPLAY
// ==================================

updateDashboard();
