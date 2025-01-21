// Smooth scrolling with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced intersection observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.transitionDelay = `${Math.random() * 0.5}s`;
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .card, .skill-card, .experience-card').forEach(element => {
    observer.observe(element);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Enhanced navigation highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNav = () => {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-indigo-600');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('text-indigo-600');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Enhanced form handling with validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate form data
        const errors = [];
        if (!formData.name) errors.push('Please enter your name');
        if (!formData.email) errors.push('Please enter your email');
        if (!formData.message) errors.push('Please enter your message');
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        // Show success message with animation
        const button = contactForm.querySelector('button');
        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        button.classList.add('success');
        
        setTimeout(() => {
            button.innerHTML = 'Send Message';
            button.classList.remove('success');
            contactForm.reset();
        }, 3000);
    });
}

// Skill cards animation
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
});

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize animations on page load
window.addEventListener('load', () => {
    // Add fade-in animation to sections
    document.querySelectorAll('section').forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
        }, index * 200);
    });

    // Initialize typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriter(heroTitle, 'Data Cloud Engineer');
    }
});

// Smooth parallax effect for cards
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            rotateY(${(x - rect.width / 2) / 50}deg)
            rotateX(${-(y - rect.height / 2) / 50}deg)
        `;
    });
});
