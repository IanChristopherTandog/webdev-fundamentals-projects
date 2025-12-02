// Simple front-end interactions: countdown, cart, wishlist, filters

document.addEventListener("DOMContentLoaded", function () {
  setupFlashSaleCountdown();
  setupCartButtons();
  setupFavoriteButtons();
  setupTodayFilters();
});

/* --------- FLASH SALE COUNTDOWN ---------
   Counts down from 8 hours each time the page is opened.
------------------------------------------ */

function setupFlashSaleCountdown() {
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");

  if (!hoursEl || !minutesEl || !secondsEl) return;

  let remainingSeconds = 8 * 60 * 60; // 8 hours

  function format(value) {
    return String(value).padStart(2, "0");
  }

  function tick() {
    if (remainingSeconds < 0) {
      clearInterval(timerId);
      return;
    }

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    hoursEl.textContent = format(hours);
    minutesEl.textContent = format(minutes);
    secondsEl.textContent = format(seconds);

    remainingSeconds -= 1;
  }

  tick();
  const timerId = setInterval(tick, 1000);
}

/* --------- CART BUTTONS --------- */

function setupCartButtons() {
  const cartCountEl = document.getElementById("cart-count");
  if (!cartCountEl) return;

  let cartCount = Number(cartCountEl.textContent) || 0;

  const addButtons = document.querySelectorAll(".add-to-cart-btn");

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartCount += 1;
      cartCountEl.textContent = cartCount;

      // Small feedback animation
      button.classList.add("btn-added");
      const originalText = button.textContent;
      button.textContent = "Added!";
      setTimeout(() => {
        button.classList.remove("btn-added");
        button.textContent = originalText;
      }, 900);
    });
  });
}

/* --------- FAVORITES / WISHLIST --------- */

function setupFavoriteButtons() {
  const favButtons = document.querySelectorAll(".favorite-btn");

  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
    });
  });
}

/* --------- TODAY'S FOR YOU FILTERS --------- */

function setupTodayFilters() {
  const filterContainer = document.getElementById("today-filters");
  const productCards = document.querySelectorAll("#today-grid .product-card");

  if (!filterContainer || productCards.length === 0) return;

  const buttons = filterContainer.querySelectorAll(".pill-tab");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter || "all";

      // Activate selected tab
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter product cards
      productCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");
        const matches =
          filter === "all" || categories.includes(filter.toLowerCase());

        card.style.display = matches ? "" : "none";
      });
    });
  });
}
