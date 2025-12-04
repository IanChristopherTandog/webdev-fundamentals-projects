// PRODUCTS JSON (as JavaScript object) -----------------------------
const products = [
  {
    id: 1,
    name: "Red Phone 128GB",
    price: 1200,
    oldPrice: 1500,
    colors: ["Red", "Gold", "Black"],
    colorClass: "red"
  },
  {
    id: 2,
    name: "Red Phone 256GB",
    price: 1400,
    oldPrice: 1700,
    colors: ["Red", "Silver"],
    colorClass: "red"
  },
  {
    id: 3,
    name: "Blue Phone 128GB",
    price: 1180,
    oldPrice: 1350,
    colors: ["Blue", "White"],
    colorClass: "blue"
  },
  {
    id: 4,
    name: "Blue Phone 256GB",
    price: 1380,
    oldPrice: 1550,
    colors: ["Blue", "Black"],
    colorClass: "blue"
  },
  {
    id: 5,
    name: "Green Phone 128GB",
    price: 1150,
    oldPrice: 1300,
    colors: ["Green", "Gold"],
    colorClass: "green"
  },
  {
    id: 6,
    name: "Green Phone 256GB",
    price: 1350,
    oldPrice: 1500,
    colors: ["Green", "Black"],
    colorClass: "green"
  },
  {
    id: 7,
    name: "Red Phone Mini",
    price: 980,
    oldPrice: 1100,
    colors: ["Red", "White"],
    colorClass: "red"
  },
  {
    id: 8,
    name: "Blue Phone Mini",
    price: 960,
    oldPrice: 1050,
    colors: ["Blue", "Silver"],
    colorClass: "blue"
  }
];

// DOM ELEMENTS -----------------------------------------------------
const productsContainer = document.getElementById("products-container");
const cartButton = document.getElementById("cart-button");
const cartCountEl = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartItemsWrapper = document.getElementById("cart-items-wrapper");
const cartItemsList = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartEmptyState = document.getElementById("cart-empty-state");
const orderBtn = document.getElementById("order-btn");
const heroShopBtn = document.getElementById("hero-shop-btn");

// Slideshow elements
const slidesContainer = document.getElementById("slides-container");
const slideDotsContainer = document.getElementById("slide-dots");
const slidePrevBtn = document.getElementById("slide-prev");
const slideNextBtn = document.getElementById("slide-next");

let cart = [];
let currentSlideIndex = 0;
let slideIntervalId = null;

// INITIALIZATION ---------------------------------------------------
createProductCards();
setupSlideshow();
updateCartView();

// PRODUCTS: FLEXBOX GRID -------------------------------------------
function createProductCards() {
  products.forEach(function (product) {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image ${product.colorClass}"></div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-colors">Colors: ${product.colors.join(", ")}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <p class="product-old-price">$${product.oldPrice.toFixed(2)}</p>

      <div class="product-actions">
        <button class="btn" data-action="add" data-id="${product.id}">Add to cart</button>
        <button class="btn btn-primary" data-action="buy" data-id="${product.id}">Order</button>
      </div>
    `;

    productsContainer.appendChild(card);
  });

  // Event delegation for buttons inside cards
  productsContainer.addEventListener("click", function (event) {
    const button = event.target;
    if (button.tagName !== "BUTTON") return;

    const productId = Number(button.getAttribute("data-id"));
    const action = button.getAttribute("data-action");

    if (action === "add") {
      addToCart(productId);
    } else if (action === "buy") {
      // Add then alert per acceptance criteria
      addToCart(productId);
      alert("Item has been added to your order.");
    }
  });
}

// CART LOGIC -------------------------------------------------------
function addToCart(productId) {
  const product = products.find(function (p) {
    return p.id === productId;
  });

  if (!product) return;

  const existingItem = cart.find(function (item) {
    return item.product.id === productId;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      product: product,
      quantity: 1
    });
  }

  updateCartView();
}

function updateCartView() {
  const totalItems = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  cartCountEl.textContent = totalItems;

  if (totalItems === 0) {
    cartEmptyState.style.display = "block";
    cartItemsWrapper.style.display = "none";
    cartItemsList.innerHTML = "";
    cartTotalEl.textContent = "$0.00";
    return;
  }

  // Show items state ("shoppingcart - products added.jpeg")
  cartEmptyState.style.display = "none";
  cartItemsWrapper.style.display = "block";

  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach(function (item) {
    const li = document.createElement("li");
    li.className = "cart-item";

    const itemTotal = item.quantity * item.product.price;
    total += itemTotal;

    li.innerHTML = `
      <span class="cart-item-name">${item.product.name}</span>
      <span class="cart-item-qty">x${item.quantity}</span>
      <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
    `;

    cartItemsList.appendChild(li);
  });

  cartTotalEl.textContent = "$" + total.toFixed(2);
}

// CART MODAL HANDLERS ----------------------------------------------
cartButton.addEventListener("click", function () {
  openCart();
});

cartCloseBtn.addEventListener("click", function () {
  closeCart();
});

cartModal.addEventListener("click", function (event) {
  // Close when clicking outside the modal box
  if (event.target === cartModal) {
    closeCart();
  }
});

orderBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("You have no items selected.");
    return;
  }

  const totalItems = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  alert("Order placed! Items selected: " + totalItems);
});

function openCart() {
  cartModal.classList.add("open");
  cartModal.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartModal.classList.remove("open");
  cartModal.setAttribute("aria-hidden", "true");
}

// Hero "Shop now" button scrolls to product list
heroShopBtn.addEventListener("click", function () {
  const offsetTop = productsContainer.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth"
  });
});

// SLIDESHOW --------------------------------------------------------
function setupSlideshow() {
  // Use first 4 products for slideshow
  const slidesData = products.slice(0, 4);

  slidesData.forEach(function (product, index) {
    // Slide element
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.setAttribute("data-index", index);

    slide.innerHTML = `
      <div class="slide-info">
        <div class="slide-title">${product.name}</div>
        <div class="slide-color">Colors: ${product.colors.join(", ")}</div>
        <div class="slide-price">$${product.price.toFixed(2)}</div>
      </div>
      <div class="slide-image"></div>
    `;
    slidesContainer.appendChild(slide);

    // Dot
    const dot = document.createElement("button");
    dot.className = "slide-dot";
    dot.setAttribute("data-index", index);
    slideDotsContainer.appendChild(dot);
  });

  // Navigation events
  slidePrevBtn.addEventListener("click", function () {
    goToSlide(currentSlideIndex - 1);
  });

  slideNextBtn.addEventListener("click", function () {
    goToSlide(currentSlideIndex + 1);
  });

  slideDotsContainer.addEventListener("click", function (event) {
    if (!event.target.classList.contains("slide-dot")) return;
    const index = Number(event.target.getAttribute("data-index"));
    goToSlide(index);
  });

  // Start on first slide
  goToSlide(0);

  // Auto-play every 4 seconds
  slideIntervalId = setInterval(function () {
    goToSlide(currentSlideIndex + 1);
  }, 4000);
}

function goToSlide(index) {
  const slides = slidesContainer.querySelectorAll(".slide");
  const dots = slideDotsContainer.querySelectorAll(".slide-dot");
  const slidesCount = slides.length;

  if (slidesCount === 0) return;

  if (index < 0) {
    index = slidesCount - 1;
  } else if (index >= slidesCount) {
    index = 0;
  }

  slides.forEach(function (slide) {
    slide.classList.remove("active");
  });
  dots.forEach(function (dot) {
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlideIndex = index;

  // Reset autoplay timer when user navigates manually
  if (slideIntervalId) {
    clearInterval(slideIntervalId);
  }
  slideIntervalId = setInterval(function () {
    goToSlide(currentSlideIndex + 1);
  }, 4000);
}
