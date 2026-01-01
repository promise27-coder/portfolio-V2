// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.m-link');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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
            if (response.status == 200) {
                formResult.innerHTML = '<p style="color: #00d4ff; text-align: center; margin-top: 10px;">Message sent successfully!</p>';
                contactForm.reset(); 
            } else {
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
            setTimeout(() => {
                formResult.innerHTML = '';
            }, 5000);
        });
    });
}
