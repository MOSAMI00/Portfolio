// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimation();
    initAboutAnimation();
    initSmoothScroll();
    initFAQAccordion();
    initScrollAnimations();
    initHeaderScroll();
    initButtonHoverEffects();
});

// About section animation - Typewriter effect with text change
function initAboutAnimation() {
    const typingText = document.querySelector('.typing-text');
    
    if (typingText) {
        const texts = ['Desktop app Developer', 'Software Engineer'];
        let currentTextIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const typeText = () => {
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                // Delete text
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster when deleting
                
                if (charIndex === 0) {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    typingSpeed = 100;
                }
            } else {
                // Type text
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
                
                if (charIndex === currentText.length) {
                    // Pause before deleting
                    typingSpeed = 2000;
                    isDeleting = true;
                }
            }
            
            // Add/remove typing class for cursor
            if (!isDeleting && charIndex < currentText.length) {
                typingText.classList.add('typing');
            } else if (charIndex === currentText.length) {
                // Keep cursor visible when text is complete
                setTimeout(() => {
                    typingText.classList.remove('typing');
                }, 1000);
            } else {
                typingText.classList.add('typing');
            }
            
            setTimeout(typeText, typingSpeed);
        };
        
        // Start typing after a delay
        setTimeout(() => {
            typingText.classList.add('typing');
            typeText();
        }, 2000); // Start after hero animation
    }
}

// Hero heading animation - Typewriter effect
function initHeroAnimation() {
    const headingWhite = document.querySelector('.heading-white');
    const headingGray = document.querySelector('.heading-gray');
    
    if (headingWhite && headingGray) {
        // Store original text - split by <br> for gray text
        const whiteText = headingWhite.textContent;
        const grayTextParts = headingGray.innerHTML.split('<br>');
        const grayTextBeforeBr = grayTextParts[0]; // "Engineer & Problem"
        const grayTextAfterBr = grayTextParts[1] || ''; // "Solver"
        
        // Clear the text initially
        headingWhite.textContent = '';
        headingGray.innerHTML = '';
        
        // Make elements visible
        headingWhite.style.opacity = '1';
        headingGray.style.opacity = '1';
        
        // Add cursor to white text
        headingWhite.classList.add('typing');
        
        // Type white text first
        let whiteIndex = 0;
        const typeWhiteText = () => {
            if (whiteIndex < whiteText.length) {
                headingWhite.textContent += whiteText.charAt(whiteIndex);
                whiteIndex++;
                setTimeout(typeWhiteText, 100); // Speed of typing (milliseconds per character)
            } else {
                // Remove cursor from white text
                headingWhite.classList.remove('typing');
                // Add cursor to gray text
                headingGray.classList.add('typing');
                // After white text is done, start typing gray text
                setTimeout(() => {
                    typeGrayText();
                }, 400); // Small pause between texts
            }
        };
        
        // Type gray text - first part before <br>
        let grayIndex = 0;
        const typeGrayText = () => {
            if (grayIndex < grayTextBeforeBr.length) {
                headingGray.innerHTML = grayTextBeforeBr.substring(0, grayIndex + 1);
                grayIndex++;
                setTimeout(typeGrayText, 100); // Speed of typing
            } else {
                // Add line break and continue with second part
                headingGray.innerHTML = grayTextBeforeBr + '<br>';
                setTimeout(() => {
                    typeGrayTextAfterBr();
                }, 300);
            }
        };
        
        // Type gray text - second part after <br>
        let grayAfterIndex = 0;
        const typeGrayTextAfterBr = () => {
            if (grayAfterIndex < grayTextAfterBr.length) {
                headingGray.innerHTML = grayTextBeforeBr + '<br>' + grayTextAfterBr.substring(0, grayAfterIndex + 1);
                grayAfterIndex++;
                setTimeout(typeGrayTextAfterBr, 100);
            } else {
                // Remove cursor when done
                headingGray.classList.remove('typing');
            }
        };
        
        // Start typing after a short delay
        setTimeout(() => {
            typeWhiteText();
        }, 600);
    }
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = 64;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Handle "Hire Me" button - scroll to contact
    const hireMeBtn = document.querySelector('.hire-me-btn');
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = 64;
                const targetPosition = contactSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Handle "Let's Talk" and "Contact me" buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = 64;
                const targetPosition = contactSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Scroll reveal animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate education items
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll down/up
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    header.style.transition = 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease';
}

// Button hover effects
function initButtonHoverEffects() {
    const buttons = document.querySelectorAll('.cta-button, .hire-me-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add ripple effect to hire me button
    const hireMeBtn = document.querySelector('.hire-me-btn');
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hero-heading {
        animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .gradient-bar {
        animation: fadeIn 1s ease-out 0.5s both;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
