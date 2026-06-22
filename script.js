// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// Smooth Scroll
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Filter buttons functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');
        filterNotes(filterValue);
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        const searchValue = this.value.toLowerCase();
        const noteCards = document.querySelectorAll('.note-card');
        noteCards.forEach(card => {
            const title = card.querySelector('.note-header').textContent.toLowerCase();
            const description = card.querySelector('.note-description').textContent.toLowerCase();
            if (title.includes(searchValue) || description.includes(searchValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Filter notes by subject
function filterNotes(subject) {
    const noteCards = document.querySelectorAll('.note-card');
    noteCards.forEach(card => {
        if (subject === 'all') {
            card.style.display = 'block';
        } else {
            const noteSubject = card.getAttribute('data-subject');
            if (noteSubject === subject) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Modal functionality
const modal = document.getElementById('noteModal');
const closeModal = document.querySelector('.close-modal');

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;

        // Send to admin email
        const mailtoLink = `mailto:adamkhanhnd44@gmail.com?subject=Message from ${name}: ${subject}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${email}`;
        window.location.href = mailtoLink;

        // Reset form
        this.reset();
    });
}

// Scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
const elementsToObserve = document.querySelectorAll('.feature-card, .resource-card, .contact-info-box');
elementsToObserve.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Add active class to current nav link
const currentLocation = location.pathname;
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
    }
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('Knowledge Hub website loaded successfully!');