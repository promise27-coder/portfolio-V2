// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

console.log("Portfolio Loaded Successfully!");

// --- MOBILE MENU LOGIC (UPDATED) ---
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.m-link');

// 1. Toggle Menu (Open/Close on same click)
hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Click ko body tak jane se rokta hai
    mobileMenu.classList.toggle('active'); // YE HAI MAGIC LINE (Open/Close karega)
});

// 2. Close Menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// 3. Close Menu when clicking anywhere outside (Pro Feature)
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});