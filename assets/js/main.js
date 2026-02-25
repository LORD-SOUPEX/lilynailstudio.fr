/* ================================================
   LILY NAIL STUDIO — Main JavaScript
   Vanilla JS — No jQuery dependency
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===================== NAVBAR SCROLL EFFECT =====================
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on load

    // ===================== MOBILE MENU =====================
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    const toggleMenu = () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ===================== SMOOTH SCROLL =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================== SCROLL REVEAL ANIMATIONS =====================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===================== LIGHTBOX =====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Open lightbox on gallery image click
    document.querySelectorAll('.gallery-item:not(.gallery-item-cta)').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ===================== STAGGERED REVEAL FOR GRID ITEMS =====================
    const staggerElements = document.querySelectorAll('.service-card, .gallery-item');
    
    staggerElements.forEach((el, index) => {
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    });

});