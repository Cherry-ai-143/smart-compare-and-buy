document.addEventListener("DOMContentLoaded", function () {
  // Three-dot menu functionality
  const menuBtn = document.querySelector(".menu-btn");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      // Remove active class from all items
      dropdownItems.forEach((i) => i.classList.remove("active"));
      // Add active class to clicked item
      this.classList.add("active");
      // Close dropdown after selection
      dropdownMenu.classList.remove("active");
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function () {
    dropdownMenu.classList.remove("active");
  });

  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");

  hamburger.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });

  // Submenu toggle functionality
  const menuItems = document.querySelectorAll(".has-submenu");

  menuItems.forEach((item) => {
    const menuItem = item.querySelector(".menu-item");
    const submenu = item.querySelector(".submenu");

    menuItem.addEventListener("click", function (e) {
      e.stopPropagation();
      submenu.classList.toggle("active");
    });
  });

  // Submenu item click handling
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      // Remove active class from all items
      submenuItems.forEach((i) => i.classList.remove("active"));
      // Add active class to clicked item
      this.classList.add("active");
    });
  });

  // Modal functionality
  const loginBtn = document.querySelector(".auth-btn:nth-of-type(1)");
  const signupBtn = document.querySelector(".auth-btn:nth-of-type(2)");
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");

  loginBtn.addEventListener("click", function () {
    loginModal.style.display = "block";
  });

  signupBtn.addEventListener("click", function () {
    signupModal.style.display = "block";
  });

  // Close modals when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = "none";
    }
    if (event.target === signupModal) {
      signupModal.style.display = "none";
    }
  });

  // Category click functionality
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      // In a real app, this would fetch products for the selected category
      // For now, we'll just highlight the selected category
      document.querySelectorAll(".category-card").forEach((c) => {
        c.style.border = "none";
      });
      this.style.border = "2px solid #ff5722";

      // Filter products by category (mock implementation)
      const products = document.querySelectorAll(".product-card");
      products.forEach((product) => {
        // In a real app, each product would have a data-category attribute
        // For demo purposes, we'll just show all products
        product.style.display = "block";
      });
    });
  });

  // Initialize first category as selected
  document.querySelector(".category-card").click();

  // Category scroller functionality
  const scroller = document.querySelector(".category-scroller");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  function updateArrowVisibility() {
    leftArrow.disabled = scroller.scrollLeft <= 0;
    rightArrow.disabled =
      scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth;
  }

  leftArrow.addEventListener("click", () => {
    scroller.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  });

  rightArrow.addEventListener("click", () => {
    scroller.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  });

  scroller.addEventListener("scroll", updateArrowVisibility);
  updateArrowVisibility();

  // New code to fetch products from backend and render dynamically
  async function fetchAndRenderProducts() {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const products = await response.json();
      const productGrid = document.querySelector(".product-grid");
      productGrid.innerHTML = ""; // Clear existing static products

      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const productImage = document.createElement("div");
        productImage.className = "product-image";

        const img = document.createElement("img");
        img.src = product.imageUrl || "images/fv.jpg";
        img.alt = product.name;

        const discountBadge = document.createElement("span");
        discountBadge.className = "discount-badge";
        discountBadge.textContent = product.discountPercent
          ? `${product.discountPercent}% OFF`
          : "";

        productImage.appendChild(img);
        productImage.appendChild(discountBadge);

        const productName = document.createElement("h3");
        productName.className = "product-name";
        productName.textContent = product.name;

        const productWeight = document.createElement("p");
        productWeight.className = "product-weight";
        productWeight.textContent = product.weight;

        const priceContainer = document.createElement("div");
        priceContainer.className = "price-container";

        const originalPrice = document.createElement("span");
        originalPrice.className = "original-price";
        originalPrice.textContent = `₹${product.originalPrice}`;

        const discountedPrice = document.createElement("span");
        discountedPrice.className = "discounted-price";
        discountedPrice.textContent = `₹${product.discountedPrice}`;

        priceContainer.appendChild(originalPrice);
        priceContainer.appendChild(discountedPrice);

        const addToCartBtn = document.createElement("button");
        addToCartBtn.className = "add-to-cart";
        addToCartBtn.textContent = "Start Comparing";

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productWeight);
        productCard.appendChild(priceContainer);
        productCard.appendChild(addToCartBtn);

        productGrid.appendChild(productCard);
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  // Fetch and render products on page load
  // Temporarily comment out to check static product cards visibility
  // fetchAndRenderProducts();

  // Advertisement banner slider logic
  const slides = document.querySelectorAll(".advertisement-banner .slide");
  const dots = document.querySelectorAll(".advertisement-banner .dot");
  let currentSlide = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
  }

  // Auto change slide every 3 seconds
  setInterval(nextSlide, 3000);

  // Dot click event to manually select slide
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      let index = parseInt(dot.getAttribute("data-index"));
      showSlide(index);
    });
  });

  // New code to cycle placeholder text in search input every 2 seconds
  const searchInput = document.querySelector(".search-input");
  const words = [
    "milk",
    "apples",
    "Basmati Rice",
    "meat",
    "ice creams",
    "sunflower oil",
    "toys",
  ];
  let wordIndex = 0;

  setInterval(() => {
    searchInput.placeholder = "Search to Compare & Buy " + words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
  }, 2000);
});
