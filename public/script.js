document.addEventListener('DOMContentLoaded', function() {
    // Three-dot menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            // Remove active class from all items
            dropdownItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            // Close dropdown after selection
            dropdownMenu.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('active');
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    
    hamburger.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Submenu toggle functionality
    const menuItems = document.querySelectorAll('.has-submenu');
    
    menuItems.forEach(item => {
        const menuItem = item.querySelector('.menu-item');
        const submenu = item.querySelector('.submenu');
        
        menuItem.addEventListener('click', function(e) {
            e.stopPropagation();
            submenu.classList.toggle('active');
        });
    });

    // Submenu item click handling
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            // Remove active class from all items
            submenuItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Modal functionality
    const loginBtn = document.querySelector('.auth-btn:nth-of-type(1)');
    const signupBtn = document.querySelector('.auth-btn:nth-of-type(2)');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');

    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    signupBtn.addEventListener('click', function() {
        signupModal.style.display = 'block';
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // Category click functionality
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            // In a real app, this would fetch products for the selected category
            // For now, we'll just highlight the selected category
            document.querySelectorAll('.category-card').forEach(c => {
                c.style.border = 'none';
            });
            this.style.border = '2px solid #ff5722';
            
            // Filter products by category (mock implementation)
            const products = document.querySelectorAll('.product-card');
            products.forEach(product => {
                // In a real app, each product would have a data-category attribute
                // For demo purposes, we'll just show all products
                product.style.display = 'block';
            });
        });
    });

    // Initialize first category as selected
    document.querySelector('.category-card').click();

    // Banner slider functionality
    const bannerSlides = document.querySelector('.banner-slides');
    const slides = document.querySelectorAll('.banner-slides > div');
    const indicators = document.querySelectorAll('.indicator-btn');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        bannerSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }

    function startSlideShow() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 3000);
    }

    // Initialize slider
    startSlideShow();

    // Pause on hover
    bannerSlides.addEventListener('mouseenter', () => clearInterval(slideInterval));
    bannerSlides.addEventListener('mouseleave', startSlideShow);

    // Clickable indicators
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(i);
            startSlideShow();
        });
    });

    // Category scroller functionality
    const scroller = document.querySelector('.category-scroller');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    function updateArrowVisibility() {
        leftArrow.disabled = scroller.scrollLeft <= 0;
        rightArrow.disabled = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth;
    }

    leftArrow.addEventListener('click', () => {
        scroller.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        scroller.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });

    scroller.addEventListener('scroll', updateArrowVisibility);
    updateArrowVisibility();
});