
let currentUser = null;
let currentView = 'home';
let currentProduct = null;
let editingProduct = null;
let cart = [];
let purchaseHistory = [];


const sampleUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        location: "San Francisco, CA"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        location: "New York, NY"
    }
];

let products = [
    {
        id: 1,
        title: "iPhone 13 Pro",
        description: "Excellent condition iPhone 13 Pro with original box and accessories. Barely used, always kept in case.",
        category: "Electronics",
        condition: "Like New",
        price: 699,
        isNegotiable: true,
        images: [
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
        ],
        sellerId: 1,
        status: "active",
        views: 45,
        createdAt: "2025-09-01T10:30:00Z"
    },
    {
        id: 2,
        title: "Vintage Leather Jacket",
        description: "Genuine leather jacket from the 90s. Classic brown color, perfect for fall weather. Some signs of wear but adds character.",
        category: "Clothing",
        condition: "Good",
        price: 150,
        isNegotiable: true,
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"
        ],
        sellerId: 2,
        status: "active",
        views: 23,
        createdAt: "2025-09-02T14:20:00Z"
    },
    {
        id: 3,
        title: "Mid-Century Modern Chair",
        description: "Beautiful walnut wood chair with original upholstery. Perfect for home office or dining room. A true vintage piece.",
        category: "Furniture",
        condition: "Good",
        price: 275,
        isNegotiable: false,
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop"
        ],
        sellerId: 1,
        status: "active",
        views: 67,
        createdAt: "2025-08-28T09:15:00Z"
    },
    {
        id: 4,
        title: "Nintendo Switch Console",
        description: "Complete Nintendo Switch console with Joy-Con controllers, dock, and 5 popular games included.",
        category: "Electronics",
        condition: "Good",
        price: 250,
        isNegotiable: true,
        images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop"
        ],
        sellerId: 2,
        status: "active",
        views: 89,
        createdAt: "2025-09-03T16:45:00Z"
    },
    {
        id: 5,
        title: "Succulent Plant Collection",
        description: "Beautiful collection of 6 different succulent plants in decorative pots. Perfect for beginners, very low maintenance.",
        category: "Home & Garden",
        condition: "New",
        price: 45,
        isNegotiable: false,
        images: [
            "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
        ],
        sellerId: 1,
        status: "sold",
        views: 34,
        createdAt: "2025-08-25T11:30:00Z"
    },
    {
        id: 6,
        title: "Road Bike - Trek FX 3",
        description: "2022 Trek FX 3 hybrid bike in excellent condition. Perfect for commuting or weekend rides. Recently serviced.",
        category: "Sports",
        condition: "Like New",
        price: 580,
        isNegotiable: true,
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=300&fit=crop"
        ],
        sellerId: 2,
        status: "active",
        views: 76,
        createdAt: "2025-09-04T13:20:00Z"
    }
];

const categories = [
    "Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Furniture", "Automotive", "Other"
];

const conditions = [
    "New", "Like New", "Good", "Fair", "Poor"
];

const categoryIcons = {
    "Electronics": "📱",
    "Clothing": "👕", 
    "Home & Garden": "🏡",
    "Sports": "⚽",
    "Books": "📚",
    "Furniture": "🪑",
    "Automotive": "🚗",
    "Other": "📦"
};


let currentFilters = {
    search: '',
    category: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    sort: 'date-desc'
};


function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    
    const container = document.getElementById('toast-container');
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function formatPrice(price) {
    return `$${price.toLocaleString()}`;
}

function getUserById(id) {
    return sampleUsers.find(user => user.id === id);
}

function getProductById(id) {
    return products.find(product => product.id === id);
}


function updateAuthUI() {
    const authContainer = document.getElementById('nav-auth');
    
    if (currentUser) {
        authContainer.innerHTML = `
            <span>Welcome, ${currentUser.name}</span>
            <button class="btn btn--primary btn--sm" onclick="showView('dashboard')">Dashboard</button>
            <button class="btn btn--outline btn--sm" onclick="showView('cart')">Cart (${cart.length})</button>
            <button class="btn btn--outline btn--sm" onclick="logout()">Logout</button>
        `;
    } else {
        authContainer.innerHTML = `
            <button class="btn btn--outline btn--sm" onclick="showView('login')">Login</button>
            <button class="btn btn--primary btn--sm" onclick="showView('register')">Register</button>
        `;
    }
}

function login(email, password) {
    const user = sampleUsers.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        updateAuthUI();
        showToast('Login successful!', 'success');
        showView('dashboard');
        return true;
    }
    showToast('Invalid email or password', 'error');
    return false;
}

function register(userData) {
    const existingUser = sampleUsers.find(u => u.email === userData.email);
    if (existingUser) {
        showToast('Email already exists', 'error');
        return false;
    }
    
    const newUser = {
        id: sampleUsers.length + 1,
        ...userData,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };
    
    sampleUsers.push(newUser);
    currentUser = newUser;
    updateAuthUI();
    showToast('Registration successful!', 'success');
    showView('dashboard');
    return true;
}

function logout() {
    currentUser = null;
    cart = [];
    updateAuthUI();
    showToast('Logged out successfully', 'info');
    showView('home');
}

function requireAuth() {
    if (!currentUser) {
        showToast('Please login to access this feature', 'error');
        showView('login');
        return false;
    }
    return true;
}


function showView(viewName) {
    console.log('Switching to view:', viewName); 
    
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
   
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
        currentView = viewName;
        
        
        switch(viewName) {
            case 'home':
                initHomeView();
                break;
            case 'browse':
                initBrowseView();
                break;
            case 'dashboard':
                if (requireAuth()) initDashboardView();
                break;
            case 'create-listing':
                if (requireAuth()) initCreateListingView();
                break;
            case 'my-listings':
                if (requireAuth()) initMyListingsView();
                break;
            case 'cart':
                if (requireAuth()) initCartView();
                break;
            case 'purchase-history':
                if (requireAuth()) initPurchaseHistoryView();
                break;
        }
    } else {
        console.error('View not found:', viewName);
    }
}


function initHomeView() {
    renderFeaturedProducts();
    renderCategories();
}

function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    const activeProducts = products.filter(p => p.status === 'active').slice(0, 6);
    
    container.innerHTML = activeProducts.map(product => `
        <div class="product-card card" onclick="openProductModal(${product.id})">
            <img src="${product.images[0]}" alt="${product.title}" class="product-image">
            <div class="card__body">
                <div class="product-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); toggleCart(${product.id})" title="Add to Cart">🛒</button>
                </div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-meta">
                    <span class="status status--info">${product.category}</span>
                    <span class="status status--success">${product.condition}</span>
                </div>
                <p class="product-description">${product.description}</p>
            </div>
        </div>
    `).join('');
}

function renderCategories() {
    const container = document.getElementById('category-links');
    container.innerHTML = categories.map(category => `
        <div class="category-card card" onclick="browseByCategory('${category}')">
            <div class="card__body">
                <div class="category-icon">${categoryIcons[category]}</div>
                <h4>${category}</h4>
            </div>
        </div>
    `).join('');
}

function browseByCategory(category) {
    console.log('Browsing by category:', category);
    currentFilters.category = category;
    currentFilters.search = ''; 
    showView('browse');
}


function initBrowseView() {
    console.log('Initializing browse view'); 
    populateFilterOptions();
    applyFilters();
}

function populateFilterOptions() {
    const categorySelect = document.getElementById('category-filter');
    const conditionSelect = document.getElementById('condition-filter');
    
    if (!categorySelect || !conditionSelect) {
        console.error('Filter elements not found');
        return;
    }
    
    categorySelect.innerHTML = '<option value="">All Categories</option>' + 
        categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    
    conditionSelect.innerHTML = '<option value="">All Conditions</option>' + 
        conditions.map(cond => `<option value="${cond}">${cond}</option>`).join('');
    
  
    categorySelect.value = currentFilters.category;
    conditionSelect.value = currentFilters.condition;
    
    const searchInput = document.getElementById('search-input');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const sortFilter = document.getElementById('sort-filter');
    
    if (searchInput) searchInput.value = currentFilters.search;
    if (minPrice) minPrice.value = currentFilters.minPrice;
    if (maxPrice) maxPrice.value = currentFilters.maxPrice;
    if (sortFilter) sortFilter.value = currentFilters.sort;
}

function applyFilters() {
   
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const conditionFilter = document.getElementById('condition-filter');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const sortFilter = document.getElementById('sort-filter');
    
    currentFilters.search = searchInput ? searchInput.value.toLowerCase() : '';
    currentFilters.category = categoryFilter ? categoryFilter.value : currentFilters.category;
    currentFilters.condition = conditionFilter ? conditionFilter.value : '';
    currentFilters.minPrice = minPrice ? minPrice.value : '';
    currentFilters.maxPrice = maxPrice ? maxPrice.value : '';
    currentFilters.sort = sortFilter ? sortFilter.value : 'date-desc';
    
  
    let filteredProducts = products.filter(product => {
        if (product.status !== 'active') return false;
        
        if (currentFilters.search && 
            !product.title.toLowerCase().includes(currentFilters.search) &&
            !product.description.toLowerCase().includes(currentFilters.search)) {
            return false;
        }
        
        if (currentFilters.category && product.category !== currentFilters.category) {
            return false;
        }
        
        if (currentFilters.condition && product.condition !== currentFilters.condition) {
            return false;
        }
        
        if (currentFilters.minPrice && product.price < parseInt(currentFilters.minPrice)) {
            return false;
        }
        
        if (currentFilters.maxPrice && product.price > parseInt(currentFilters.maxPrice)) {
            return false;
        }
        
        return true;
    });
    
   
    filteredProducts.sort((a, b) => {
        switch(currentFilters.sort) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'date-asc':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'date-desc':
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });
    
    renderFilteredProducts(filteredProducts);
    renderActiveFilters();
}

function renderFilteredProducts(filteredProducts) {
    const container = document.getElementById('browse-products');
    const noProducts = document.getElementById('no-products');
    
    if (!container || !noProducts) {
        console.error('Browse products containers not found');
        return;
    }
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '';
        noProducts.classList.remove('hidden');
    } else {
        noProducts.classList.add('hidden');
        container.innerHTML = filteredProducts.map(product => `
            <div class="product-card card" onclick="openProductModal(${product.id})">
                <img src="${product.images[0]}" alt="${product.title}" class="product-image">
                <div class="card__body">
                    <div class="product-actions">
                        <button class="action-btn" onclick="event.stopPropagation(); toggleCart(${product.id})" title="Add to Cart">🛒</button>
                    </div>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <div class="product-meta">
                        <span class="status status--info">${product.category}</span>
                        <span class="status status--success">${product.condition}</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                </div>
            </div>
        `).join('');
    }
}

function renderActiveFilters() {
    const container = document.getElementById('active-filters');
    if (!container) return;
    
    const activeFilters = [];
    
    if (currentFilters.search) {
        activeFilters.push({ type: 'search', value: currentFilters.search, label: `Search: "${currentFilters.search}"` });
    }
    if (currentFilters.category) {
        activeFilters.push({ type: 'category', value: currentFilters.category, label: `Category: ${currentFilters.category}` });
    }
    if (currentFilters.condition) {
        activeFilters.push({ type: 'condition', value: currentFilters.condition, label: `Condition: ${currentFilters.condition}` });
    }
    if (currentFilters.minPrice || currentFilters.maxPrice) {
        const min = currentFilters.minPrice || '0';
        const max = currentFilters.maxPrice || '∞';
        activeFilters.push({ type: 'price', value: '', label: `Price: $${min} - $${max}` });
    }
    
    container.innerHTML = activeFilters.map(filter => `
        <div class="filter-tag">
            ${filter.label}
            <button onclick="removeFilter('${filter.type}')">&times;</button>
        </div>
    `).join('');
}

function removeFilter(type) {
    switch(type) {
        case 'search':
            currentFilters.search = '';
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';
            break;
        case 'category':
            currentFilters.category = '';
            const categoryFilter = document.getElementById('category-filter');
            if (categoryFilter) categoryFilter.value = '';
            break;
        case 'condition':
            currentFilters.condition = '';
            const conditionFilter = document.getElementById('condition-filter');
            if (conditionFilter) conditionFilter.value = '';
            break;
        case 'price':
            currentFilters.minPrice = '';
            currentFilters.maxPrice = '';
            const minPrice = document.getElementById('min-price');
            const maxPrice = document.getElementById('max-price');
            if (minPrice) minPrice.value = '';
            if (maxPrice) maxPrice.value = '';
            break;
    }
    applyFilters();
}

function clearFilters() {
    currentFilters = {
        search: '',
        category: '',
        condition: '',
        minPrice: '',
        maxPrice: '',
        sort: 'date-desc'
    };
    populateFilterOptions();
    applyFilters();
}


function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    const seller = getUserById(product.sellerId);
    currentProduct = product;
    
    document.getElementById('modal-product-title').textContent = product.title;
    document.getElementById('modal-product-image').src = product.images[0];
    document.getElementById('modal-product-image').alt = product.title;
    document.getElementById('modal-product-price').textContent = formatPrice(product.price);
    document.getElementById('modal-product-category').textContent = product.category;
    document.getElementById('modal-product-condition').textContent = product.condition;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-seller-name').textContent = seller.name;
    document.getElementById('modal-seller-location').textContent = seller.location;
    
    const addToCartBtn = document.getElementById('modal-add-to-cart');
    if (currentUser && currentUser.id !== product.sellerId) {
        addToCartBtn.style.display = 'inline-flex';
        addToCartBtn.textContent = cart.find(item => item.id === productId) ? 'Remove from Cart' : 'Add to Cart';
    } else {
        addToCartBtn.style.display = 'none';
    }
    
    document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    currentProduct = null;
}


function toggleCart(productId) {
    if (!requireAuth()) return;
    
    const product = getProductById(productId);
    if (product.sellerId === currentUser.id) {
        showToast('You cannot add your own items to cart', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        cart = cart.filter(item => item.id !== productId);
        showToast('Removed from cart', 'info');
    } else {
        cart.push(product);
        showToast('Added to cart', 'success');
    }
    
    updateAuthUI();
}

function addToCart() {
    if (currentProduct) {
        toggleCart(currentProduct.id);
        closeProductModal();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateAuthUI();
    initCartView();
    showToast('Removed from cart', 'info');
}

function initCartView() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.classList.remove('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        cartTotal.classList.remove('hidden');
        
        cartItems.innerHTML = cart.map(product => `
            <div class="cart-item">
                <img src="${product.images[0]}" alt="${product.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${product.title}</div>
                    <div class="cart-item-price">${formatPrice(product.price)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="btn btn--outline btn--sm" onclick="removeFromCart(${product.id})">Remove</button>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, product) => sum + product.price, 0);
        document.getElementById('cart-total-amount').textContent = total.toLocaleString();
    }
}

function checkout() {
    if (cart.length === 0) return;
    
    const purchase = {
        id: purchaseHistory.length + 1,
        date: new Date().toISOString(),
        items: [...cart],
        total: cart.reduce((sum, product) => sum + product.price, 0)
    };
    
    purchaseHistory.push(purchase);
    cart = [];
    updateAuthUI();
    
    showToast('Purchase completed successfully!', 'success');
    showView('purchase-history');
}


function initDashboardView() {
    const userProducts = products.filter(p => p.sellerId === currentUser.id);
    const soldItems = userProducts.filter(p => p.status === 'sold');
    const activeListings = userProducts.filter(p => p.status === 'active');
    
    document.getElementById('dashboard-welcome').textContent = `Welcome back, ${currentUser.name}!`;
    document.getElementById('total-listings').textContent = userProducts.length;
    document.getElementById('sold-items').textContent = soldItems.length;
    document.getElementById('active-listings').textContent = activeListings.length;
}


function initCreateListingView() {
    const form = document.getElementById('listing-form');
    const title = document.getElementById('listing-form-title');
    
    if (editingProduct) {
        title.textContent = 'Edit Listing';
        populateListingForm(editingProduct);
    } else {
        title.textContent = 'Create New Listing';
        form.reset();
    }
    
    populateListingSelects();
}

function populateListingSelects() {
    const categorySelect = document.getElementById('listing-category');
    const conditionSelect = document.getElementById('listing-condition');
    
    categorySelect.innerHTML = '<option value="">Select Category</option>' + 
        categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    
    conditionSelect.innerHTML = '<option value="">Select Condition</option>' + 
        conditions.map(cond => `<option value="${cond}">${cond}</option>`).join('');
}

function populateListingForm(product) {
    document.getElementById('listing-title').value = product.title;
    document.getElementById('listing-category').value = product.category;
    document.getElementById('listing-description').value = product.description;
    document.getElementById('listing-condition').value = product.condition;
    document.getElementById('listing-price').value = product.price;
    document.getElementById('listing-negotiable').checked = product.isNegotiable;
}

function cancelListing() {
    editingProduct = null;
    showView(currentUser ? 'dashboard' : 'home');
}

function initMyListingsView() {
    const container = document.getElementById('my-listings-grid');
    const userProducts = products.filter(p => p.sellerId === currentUser.id);
    
    if (userProducts.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>You haven\'t created any listings yet.</p></div>';
        return;
    }
    
    container.innerHTML = userProducts.map(product => `
        <div class="product-card card">
            <img src="${product.images[0]}" alt="${product.title}" class="product-image">
            <div class="card__body">
                <div class="listing-status">
                    <span class="status status--${product.status === 'active' ? 'success' : 'info'}">${product.status}</span>
                </div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-meta">
                    <span class="status status--info">${product.category}</span>
                    <span class="status status--success">${product.condition}</span>
                </div>
                <div class="product-actions" style="position: static; opacity: 1; margin-top: 12px;">
                    <button class="btn btn--outline btn--sm" onclick="editListing(${product.id})">Edit</button>
                    ${product.status === 'active' ? `<button class="btn btn--primary btn--sm" onclick="markAsSold(${product.id})">Mark as Sold</button>` : ''}
                    <button class="btn btn--outline btn--sm" onclick="deleteListing(${product.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function editListing(productId) {
    editingProduct = getProductById(productId);
    showView('create-listing');
}

function markAsSold(productId) {
    const product = getProductById(productId);
    if (product) {
        product.status = 'sold';
        showToast('Product marked as sold', 'success');
        initMyListingsView();
        if (currentView === 'dashboard') {
            initDashboardView();
        }
    }
}

function deleteListing(productId) {
    if (confirm('Are you sure you want to delete this listing?')) {
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            showToast('Listing deleted', 'info');
            initMyListingsView();
            if (currentView === 'dashboard') {
                initDashboardView();
            }
        }
    }
}


function initPurchaseHistoryView() {
    const container = document.getElementById('purchase-history-list');
    
    if (purchaseHistory.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No purchase history yet.</p></div>';
        return;
    }
    
    container.innerHTML = purchaseHistory.map(purchase => `
        <div class="purchase-item">
            <div class="purchase-date">${formatDate(purchase.date)}</div>
            <div class="purchase-items">
                ${purchase.items.map(item => `
                    <div class="purchase-item-card">
                        <img src="${item.images[0]}" alt="${item.title}" class="purchase-item-image">
                        <div>
                            <div class="product-title">${item.title}</div>
                            <div class="product-price">${formatPrice(item.price)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="purchase-total">Total: ${formatPrice(purchase.total)}</div>
        </div>
    `).join('');
}


window.showView = showView;
window.browseByCategory = browseByCategory;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.toggleCart = toggleCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
window.login = login;
window.register = register;
window.logout = logout;
window.applyFilters = applyFilters;
window.removeFilter = removeFilter;
window.clearFilters = clearFilters;
window.cancelListing = cancelListing;
window.editListing = editListing;
window.markAsSold = markAsSold;
window.deleteListing = deleteListing;


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app'); 
    
    
    updateAuthUI();
    showView('home');
    
   
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            login(email, password);
        });
    }
    
  
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const location = document.getElementById('register-location').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            register({ name, email, location, password });
        });
    }
    
    
    const listingForm = document.getElementById('listing-form');
    if (listingForm) {
        listingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                title: document.getElementById('listing-title').value,
                category: document.getElementById('listing-category').value,
                description: document.getElementById('listing-description').value,
                condition: document.getElementById('listing-condition').value,
                price: parseInt(document.getElementById('listing-price').value),
                isNegotiable: document.getElementById('listing-negotiable').checked
            };
            
            if (editingProduct) {
                Object.assign(editingProduct, formData);
                showToast('Listing updated successfully', 'success');
                editingProduct = null;
            } else {
                const newProduct = {
                    id: products.length + 1,
                    ...formData,
                    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
                    sellerId: currentUser.id,
                    status: 'active',
                    views: 0,
                    createdAt: new Date().toISOString()
                };
                products.push(newProduct);
                showToast('Listing created successfully', 'success');
            }
            
            showView('my-listings');
        });
    }
    
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
    
    
    const productModal = document.getElementById('product-modal');
    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeProductModal();
            }
        });
    }
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecofinds', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to LOCAL MongoDB');
  console.log('📍 Database: ecofinds');
  console.log('🌐 URL: mongodb://localhost:27017');
})
.catch((err) => console.error('❌ MongoDB connection error:', err));
