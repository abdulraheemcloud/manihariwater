// Contact Form Handler with validation and WhatsApp fallback
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !phone) {
            showFeedback('Please fill all required fields (Name, Email, Phone).', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }
        
        if (!validatePhone(phone)) {
            showFeedback('Please enter a valid 10-digit phone number.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (since no backend, redirect to WhatsApp with pre-filled message)
        const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Message:* ${message || 'No message provided.'}`;
        const whatsappURL = `https://wa.me/919876543210?text=${whatsappMessage}`;
        
        setTimeout(() => {
            showFeedback('Redirecting to WhatsApp to complete your inquiry...', 'success');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            contactForm.reset();
            
            // Clear feedback after 3 seconds
            setTimeout(() => {
                if (formFeedback) formFeedback.style.display = 'none';
            }, 4000);
        }, 1000);
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

function showFeedback(message, type) {
    if (formFeedback) {
        formFeedback.textContent = message;
        formFeedback.style.color = type === 'error' ? '#d32f2f' : '#2E7D32';
        formFeedback.style.fontWeight = '500';
        formFeedback.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            if (formFeedback) formFeedback.style.display = 'none';
        }, 5000);
    } else {
        alert(message);
    }
}

// Add floating WhatsApp button (optional extra)
const addFloatingWhatsApp = () => {
    if (!document.querySelector('.fixed-wa-btn')) {
        const floatBtn = document.createElement('a');
        floatBtn.href = "https://wa.me/919876543210?text=Hello%20Mani%20Hari%20Water%2C%20I%20need%20assistance!";
        floatBtn.target = "_blank";
        floatBtn.className = "fixed-wa-btn";
        floatBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        floatBtn.style.position = "fixed";
        floatBtn.style.bottom = "20px";
        floatBtn.style.right = "20px";
        floatBtn.style.backgroundColor = "#25D366";
        floatBtn.style.color = "white";
        floatBtn.style.width = "55px";
        floatBtn.style.height = "55px";
        floatBtn.style.borderRadius = "50%";
        floatBtn.style.display = "flex";
        floatBtn.style.alignItems = "center";
        floatBtn.style.justifyContent = "center";
        floatBtn.style.fontSize = "28px";
        floatBtn.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
        floatBtn.style.zIndex = "999";
        floatBtn.style.transition = "all 0.3s";
        floatBtn.style.textDecoration = "none";
        floatBtn.onmouseover = () => floatBtn.style.transform = "scale(1.1)";
        floatBtn.onmouseout = () => floatBtn.style.transform = "scale(1)";
        document.body.appendChild(floatBtn);
    }
};

// Add floating button on load
window.addEventListener('load', addFloatingWhatsApp);
