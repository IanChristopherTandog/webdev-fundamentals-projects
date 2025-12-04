
const productsData = {
    "product": [
        {
            "name": "iPhone 14 Pro",
            "brand": "Apple",
            "description": "The latest iPhone with Dynamic Island and A16 Bionic chip",
            "price": "999",
            "image": "asset/images/iPhone14Pro.png",
            "colors": ["#000000", "#9370DB", "#FFD700"]
        },
        {
            "name": "Samsung Galaxy S23",
            "brand": "Samsung",
            "description": "Flagship Android phone with incredible camera system",
            "price": "899",
            "image": "asset/images/SamsungGalaxyS23.jpg",
            "colors": ["#000000", "#F8F8FF", "#90EE90"]
        },
        {
            "name": "MacBook Pro 16",
            "brand": "Apple",
            "description": "Powerful laptop with M2 Pro chip for professionals",
            "price": "2499",
            "image": "asset/images/MacBookPro16.jpg",
            "colors": ["#C0C0C0", "#2F4F4F"]
        },
        {
            "name": "iPad Air",
            "brand": "Apple",
            "description": "Versatile tablet perfect for work and creativity",
            "price": "599",
            "image": "asset/images/iPadAir.jpg",
            "colors": ["#ADD8E6", "#FFB6C1", "#9370DB"]
        },
        {
            "name": "AirPods Pro",
            "brand": "Apple",
            "description": "Premium wireless earbuds with active noise cancellation",
            "price": "249",
            "image": "asset/images/AirPodsPro.jpg",
            "colors": ["#FFFFFF"]
        },
        {
            "name": "Sony WH-1000XM5",
            "brand": "Sony",
            "description": "Industry-leading noise canceling headphones",
            "price": "399",
            "image": "asset/images/SonyWH-1000XM5.jpg",
            "colors": ["#000000", "#C0C0C0"]
        },
        {
            "name": "Redmi K30 Pro",
            "brand": "Xiaomi",
            "description": "High-performance smartphone with pop-up camera",
            "price": "499",
            "image": "asset/images/RedmiK30Pro.jpg",
            "colors": ["#000000", "#FF4500", "#1E90FF"]
        },
        {
            "name": "Redmi 9",
            "brand": "Xiaomi",
            "description": "Affordable smartphone with great features",
            "price": "199",
            "image": "asset/images/Redmi9.png",
            "colors": ["#32CD32", "#FF69B4", "#1E90FF"]
        },
        {
            "name": "ROG Strix G18 G815",
            "brand": "ASUS",
            "description": "Gaming laptop with high refresh rate display",
            "price": "1799",
            "image": "asset/images/ROGStrix.webp",
            "colors": ["#000000"]
        },
        {
            "name": "Google Pixel 8 Pro",
            "brand": "Google",
            "description": "Google's flagship phone with Tensor G3 chip",
            "price": "899",
            "image": "asset/images/GooglePixel8Pro.png",
            "colors": ["#000000", "#FFFFFF"]
        },
        {
            "name": "Apple Watch Series 9",
            "brand": "Apple",
            "description": "Advanced smartwatch with health tracking features",
            "price": "399",
            "image": "asset/images/AppleWatchSeries9.png",
            "colors": ["#000000", "#FF4500", "#32CD32"]
        },
        {
            "name": "Galaxy Tab S9 Ultra",
            "brand": "Samsung",
            "description": "High-end tablet with expansive display",
            "price": "1099",
            "image": "asset/images/GalaxyTabS9Ultra.png",
            "colors": ["#000000", "#F8F8FF"]
        }
    ],
    "slideImages": [
        {
            "image": "asset/slideImages/1.png",
        },
        {
            "image": "asset/slideImages/2.png",
        },
        {
            "image": "asset/slideImages/3.png",
        },
        {
            "image": "asset/slideImages/4.png",
        },
    ]
};

let cart = [];
let currentSlide = 0;
let selectedColors = {};

function initSlideshow() {
    const slideshowContainer = document.getElementById('slideshow');
    const dotsContainer = document.getElementById('dotsContainer');
    
    productsData.slideImages.slice(0, 3).forEach((slideImages, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide' + (index === 0 ? ' active' : '');
        slide.innerHTML = `
            <img src="${slideImages.image}" alt="${slideImages.name}">
            <div class="slide-content">
            <!---->
            </div>
        `;
        slideshowContainer.appendChild(slide);

        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    const prevBtn = document.createElement('button');
    prevBtn.className = 'slide-nav prev';
    prevBtn.innerHTML = '&#10096;';
    prevBtn.onclick = () => changeSlide(-1);
    slideshowContainer.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'slide-nav next';
    nextBtn.innerHTML = '&#10097;';
    nextBtn.onclick = () => changeSlide(1);
    slideshowContainer.appendChild(nextBtn);

    setInterval(() => changeSlide(1), 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function renderProducts() {
    const container = document.getElementById('productsContainer');
    
    productsData.product.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const colorsHTML = product.colors.map((color, colorIndex) => 
            `<div class="color-circle ${colorIndex === 0 ? 'selected' : ''}" 
                  style="background-color: ${color}" 
                  onclick="selectColor(${index}, '${color}', event)"></div>`
        ).join('');
        
        selectedColors[index] = product.colors[0];

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-colors">${colorsHTML}</div>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart-btn" onclick="addToCart(event, ${index})">Add to Cart</button>

            </div>
        `;
        
        container.appendChild(card);
    });
}

function addToCart(event, productIndex) {
    const product = productsData.product[productIndex];
    const selectedColor = selectedColors[productIndex];

    // Check if same product with same color is already in the cart
    const existingItemIndex = cart.findIndex(
        (item) => item.name === product.name && item.selectedColor === selectedColor
    );

    if (existingItemIndex !== -1) {
        // Increase quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item with quantity = 1
        cart.push({
            ...product,
            selectedColor,
            quantity: 1
        });
    }

    updateCartCount();
    const btn = event.currentTarget || event.target;

    // Clear old timer if exists so it doesn't conflict
    if (btn._resetTimerId) {
        clearTimeout(btn._resetTimerId);
    }

    const originalText = btn.textContent;
    const originalBg = btn.style.background;

    btn.textContent = 'Added!';
    btn.style.background = '#2ecc71';

    btn._resetTimerId = setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = originalBg;
        btn._resetTimerId = null;
    }, 100);
}


function selectColor(productIndex, color, event) {
    const card = event.target.closest('.product-card');
    const colorCircles = card.querySelectorAll('.color-circle');
    
    colorCircles.forEach(circle => circle.classList.remove('selected'));
    event.target.classList.add('selected');
    
    selectedColors[productIndex] = color;
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;

    if(cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCartCount();
    openCart();
}


function openCart() {
    const modal = document.getElementById('cartModal');
    const cartContent = document.getElementById('cartContent');
    const cartItemCount = document.getElementById('cartItemCount');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemCount.textContent = `Number of items in the cart: ${totalItems}`;

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
    } else {
        const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

        const itemsHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-color">
                        <span>Color:</span>
                        <div class="cart-item-color-dot" style="background-color: ${item.selectedColor}"></div>
                    </div>
                    <div class="cart-item-quantity">
                    Quantity: 
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');

        cartContent.innerHTML = `
            <div class="cart-items">
                ${itemsHTML}
            </div>
            <div class="cart-total">
                Total: $${total.toFixed(2)}
            </div>
            <button class="order-btn" onclick="placeOrder()">Place Order</button>
        `;
    }

    modal.classList.add('active');
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    openCart();
}

function placeOrder() {
    if (cart.length === 0) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    alert(`Order placed successfully!\n\nTotal items: ${totalItems}\nTotal amount: $${total.toFixed(2)}\n\nThank you for your purchase!`);

    cart = [];
    updateCartCount();
    closeCart();
}


window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
}

initSlideshow();
renderProducts();
