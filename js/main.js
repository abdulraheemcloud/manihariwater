// Sticky Navbar & Active Link Highlighting
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
    
    // Active link update
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Testimonial Slider Data
const testimonialsData = [
    {
        text: "Mani Hari Water has been our family's go-to for over 2 years. The taste is pristine, and delivery is always on time. Highly recommend!",
        name: "Priya Sharma",
        title: "Regular Customer"
    },
    {
        text: "Excellent service! Emergency delivery reached in 25 minutes when we ran out during a party. The 1L bottles are very convenient.",
        name: "Rajesh Menon",
        title: "Event Organizer"
    },
    {
        text: "Bulk supply for our office has been seamless. Professional staff and great pricing. The water quality is consistently top-notch.",
        name: "Anita Desai",
        title: "Office Manager"
    },
    {
        text: "Very affordable prices and the subscription plan saves us money. The 0.5L bottles are perfect for my kids' lunchboxes.",
        name: "Vikram Singh",
        title: "Happy Parent"
    }
];

let currentSlide = 0;
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('sliderDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Render testimonials
function renderTestimonials() {
    track.innerHTML = '';
    testimonialsData.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <i class="fas fa-quote-left"></i>
            <p>${testimonial.text}</p>
            <h4 class="customer-name">${testimonial.name}</h4>
            <span class="customer-title">${testimonial.title}</span>
        `;
        track.appendChild(card);
    });
    updateSlider();
}

function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });
}

function createDots() {
    dotsContainer.innerHTML = '';
    testimonialsData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialsData.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialsData.length) % testimonialsData.length;
    updateSlider();
}

if (track) {
    renderTestimonials();
    createDots();
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto slide every 5 seconds
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slider = document.getElementById('testimonialSlider');
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form handler
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email.');
        }
    });
}

// Animation on scroll (simple fade-in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .service-card, .info-card, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
