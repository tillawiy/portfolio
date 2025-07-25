// Advanced Interactive Effects for Enhanced CV

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and timing
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        container.appendChild(particle);
        this.particles.push(particle);
    }
}

// Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.trail = [];
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });
    }

    addTrailPoint(x, y) {
        const point = document.createElement('div');
        point.className = 'cursor-trail-point';
        point.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: rgba(34, 211, 238, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: trailFade 1s ease-out forwards;
        `;

        document.body.appendChild(point);

        setTimeout(() => {
            if (point.parentNode) {
                point.parentNode.removeChild(point);
            }
        }, 1000);
    }
}

// Skill Progress Animation
class SkillProgressAnimator {
    constructor() {
        this.init();
    }

    init() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgress(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    animateProgress(progressBar) {
        const targetWidth = progressBar.style.getPropertyValue('--progress-width');
        let currentWidth = 0;
        const increment = parseInt(targetWidth) / 100;

        const animate = () => {
            if (currentWidth < parseInt(targetWidth)) {
                currentWidth += increment;
                progressBar.style.width = currentWidth + '%';
                requestAnimationFrame(animate);
            } else {
                progressBar.style.width = targetWidth;
            }
        };

        animate();
    }
}

// Typing Effect
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before starting new text
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// 3D Tilt Effect
class TiltEffect {
    constructor() {
        this.init();
    }

    init() {
        const tiltElements = document.querySelectorAll('.card-3d');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.handleTilt(e, element);
            });

            element.addEventListener('mouseleave', () => {
                this.resetTilt(element);
            });
        });
    }

    handleTilt(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        const inner = element.querySelector('.card-inner');
        if (inner) {
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    }

    resetTilt(element) {
        const inner = element.querySelector('.card-inner');
        if (inner) {
            inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }
    }
}

// Sound Effects
class SoundEffects {
    constructor() {
        this.sounds = {
            click: this.createSound(800, 0.1, 'square'),
            hover: this.createSound(600, 0.05, 'sine'),
            success: this.createSound(880, 0.2, 'sine')
        };
        this.init();
    }

    createSound(frequency, duration, type = 'sine') {
        return () => {
            if ('AudioContext' in window || 'webkitAudioContext' in window) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = type;
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + duration);
            }
        };
    }

    init() {
        // Add click sounds to buttons
        document.querySelectorAll('button, .btn, a[href="#"]').forEach(element => {
            element.addEventListener('click', this.sounds.click);
        });

        // Add hover sounds to cards
        document.querySelectorAll('.project-card, .skill-card').forEach(element => {
            element.addEventListener('mouseenter', this.sounds.hover);
        });
    }
}

// Smooth Scroll with Easing
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.scrollToElement(target);
                }
            });
        });
    }

    scrollToElement(element) {
        const targetPosition = element.offsetTop - 80; // Account for fixed header
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const progressRatio = Math.min(progress / duration, 1);
            
            // Easing function (easeInOutCubic)
            const easeInOutCubic = progressRatio < 0.5 
                ? 4 * progressRatio * progressRatio * progressRatio 
                : 1 - Math.pow(-2 * progressRatio + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * easeInOutCubic);
            
            if (progress < duration) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }
}

// Form Validation and Animation
class FormValidator {
    constructor() {
        this.init();
    }

    init() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        });
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Remove previous error styling
        field.classList.remove('error');
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }

        // Check if required field is empty
        if (field.required && !value) {
            this.showError(field, 'هذا الحقل مطلوب');
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'يرجى إدخال بريد إلكتروني صحيح');
                isValid = false;
            }
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-400 text-sm mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

// Dark Mode Toggle
class DarkModeToggle {
    constructor() {
        this.isDark = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'fixed top-4 left-4 w-12 h-12 bg-slate-800 hover:bg-slate-700 text-yellow-400 rounded-full shadow-lg transition-all duration-300 z-50 no-print';
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        toggleButton.addEventListener('click', () => this.toggle());
        document.body.appendChild(toggleButton);

        // Apply saved theme
        if (this.isDark) {
            this.enableDarkMode();
        }
    }

    toggle() {
        this.isDark = !this.isDark;
        localStorage.setItem('darkMode', this.isDark);
        
        if (this.isDark) {
            this.enableDarkMode();
        } else {
            this.disableDarkMode();
        }
    }

    enableDarkMode() {
        document.body.classList.add('dark-mode');
        // Additional dark mode styling can be added here
    }

    disableDarkMode() {
        document.body.classList.remove('dark-mode');
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Monitor page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Page loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
        });

        // Monitor scroll performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        // Lazy load images that are near viewport
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            if (this.isNearViewport(img)) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }

    isNearViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        return rect.top < windowHeight + 200 && rect.bottom > -200;
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system only on desktop for performance
    if (window.innerWidth > 768) {
        new ParticleSystem();
        new CursorTrail();
    }
    
    new SkillProgressAnimator();
    new TiltEffect();
    new SmoothScroll();
    new FormValidator();
    new DarkModeToggle();
    new PerformanceMonitor();
    
    // Add sound effects only if user interacts (browser requirement)
    document.addEventListener('click', () => {
        new SoundEffects();
    }, { once: true });

    // Initialize typing effect for dynamic text
    const dynamicTextElement = document.querySelector('.dynamic-text');
    if (dynamicTextElement) {
        new TypingEffect(dynamicTextElement, [
            'مطور تطبيقات Flutter محترف',
            'خبير في تطوير التطبيقات المتنقلة',
            'مصمم واجهات مستخدم إبداعية',
            'مبرمج شغوف بالتقنيات الحديثة'
        ]);
    }

    // Add loading animations
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }, index * 100);
    });
});

// Add CSS for cursor trail animation
const trailStyles = document.createElement('style');
trailStyles.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 1px #ef4444;
    }
    
    .dark-mode {
        filter: invert(1) hue-rotate(180deg);
    }
    
    .dark-mode img {
        filter: invert(1) hue-rotate(180deg);
    }
`;
document.head.appendChild(trailStyles);