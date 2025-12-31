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
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // 1. AA LINE PAGE RELOAD THATA ROKSE (Bakchodi bandh)
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        })
        .then(async (response) => {
            const json = await response.json();
            if (response.status == 200) {
                // SUCCESS
                formResult.innerHTML = '<p style="color: #00d4ff; text-align: center; margin-top: 10px;">Message Sent Successfully! ✅</p>';
                
                // FORM KHALI KARSE
                contactForm.reset(); 
            } else {
                // ERROR
                console.log(response);
                formResult.innerHTML = '<p style="color: #ff4444; text-align: center; margin-top: 10px;">Something went wrong!</p>';
            }
        })
        .catch(error => {
            console.log(error);
            formResult.innerHTML = '<p style="color: #ff4444; text-align: center; margin-top: 10px;">Something went wrong!</p>';
        })
        .finally(() => {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            
            // 5 second pachi message gayab
            setTimeout(() => {
                formResult.innerHTML = '';
            }, 5000);
        });
    });
}