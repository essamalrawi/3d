// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animateElements = document.querySelectorAll('.section-header, .about-content, .about-visual, .portfolio-item, .service-card, .contact-info, .contact-form-container');

    animateElements.forEach((el, index) => {
        // Add different animation classes based on element type or position
        if (el.classList.contains('about-content') || el.classList.contains('contact-info')) {
            el.classList.add('slide-in-left');
        } else if (el.classList.contains('about-visual') || el.classList.contains('contact-form-container')) {
            el.classList.add('slide-in-right');
        } else {
            el.classList.add('fade-in');
            // Faster stagger animations - reduced from 0.1s to 0.05s
            el.style.transitionDelay = `${index * 0.05}s`;
        }
        observer.observe(el);
    });

    // Portfolio item hover effects - faster transitions
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        // Add faster transition
        item.style.transition = 'transform 0.2s ease-out';

        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Service card hover effects - faster transitions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Add faster transition
        card.style.transition = 'transform 0.2s ease-out';

        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // CTA Button functionality
    const ctaPrimary = document.querySelector('.cta-primary');
    const ctaSecondary = document.querySelector('.cta-secondary');

    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', function () {
            document.querySelector('#portfolio').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', function () {
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Contact form handling - faster feedback
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Faster form submission simulation - reduced from 2000ms to 1000ms
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                // Reset form
                this.reset();

                // Faster button reset - reduced from 3000ms to 2000ms
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                }, 2000);
            }, 1000);
        });
    }

    // Floating shapes animation enhancement - more responsive movement
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        // Add faster transition for smoother movement
        shape.style.transition = 'transform 0.1s ease-out';

        // Add random movement on mouse move with increased responsiveness
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            // Increased multiplier for more noticeable movement
            const moveX = (x - 50) * 0.15 * (index + 1);
            const moveY = (y - 50) * 0.15 * (index + 1);

            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        const heroContent = document.querySelector('.hero-content');

        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // Portfolio filtering and loading
    const portfolioGrid = document.getElementById('portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');

    // Additional portfolio projects data (simulated)
    const additionalProjects = [
        {
            title: "Luxury Interior Design",
            description: "Sophisticated 3D interior visualizations",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&crop=entropy",
            tags: ["3D Rendering", "Interior"],
            category: "3d-rendering"
        },
        {
            title: "Car Animation",
            description: "High-end automotive visualization",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop&crop=entropy",
            tags: ["Animation", "Automotive"],
            category: "animation"
        },
        {
            title: "Fantasy Character",
            description: "Detailed fantasy game character",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=entropy",
            tags: ["Character", "Fantasy"],
            category: "character"
        },
        {
            title: "Cyberpunk Environment",
            description: "Futuristic cityscape design",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=entropy",
            tags: ["Environment", "Sci-Fi"],
            category: "environment"
        },
        {
            title: "Medical VR Training",
            description: "Educational VR simulation",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=entropy",
            tags: ["VR", "Medical"],
            category: "vr"
        },
        {
            title: "Product Showcase",
            description: "Interactive product demonstration",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=entropy",
            tags: ["Animation", "Product"],
            category: "animation"
        }
    ];

    let currentProjectIndex = 0;
    const projectsPerLoad = 3;

    // Portfolio filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                } else {
                    const itemCategory = item.getAttribute('data-category') || '';
                    const itemTags = item.querySelectorAll('.tag');
                    let matchesFilter = false;

                    // Check if item matches filter by category or tags
                    if (itemCategory === filterValue) {
                        matchesFilter = true;
                    } else {
                        itemTags.forEach(tag => {
                            if (tag.textContent.toLowerCase().includes(filterValue.replace('-', ' '))) {
                                matchesFilter = true;
                            }
                        });
                    }

                    if (matchesFilter) {
                        item.classList.remove('hidden');
                        item.classList.add('visible');
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('visible');
                    }
                }
            });
        });
    });

    // Load more projects
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            const projectsToLoad = additionalProjects.slice(
                currentProjectIndex,
                currentProjectIndex + projectsPerLoad
            );

            projectsToLoad.forEach(project => {
                const portfolioItem = createPortfolioItem(project);
                portfolioGrid.appendChild(portfolioItem);

                // Faster animation for new items - reduced from 100ms to 50ms
                setTimeout(() => {
                    portfolioItem.classList.add('visible');
                    observer.observe(portfolioItem);
                }, 50);
            });

            currentProjectIndex += projectsPerLoad;

            // Hide load more button when all projects are loaded
            if (currentProjectIndex >= additionalProjects.length) {
                loadMoreBtn.style.display = 'none';
            }

            // Update button text
            const remainingProjects = additionalProjects.length - currentProjectIndex;
            if (remainingProjects > 0) {
                loadMoreBtn.textContent = `Load More Projects (${remainingProjects} remaining)`;
            }
        });
    }

    // Function to create portfolio item HTML
    function createPortfolioItem(project) {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item fade-in';
        portfolioItem.setAttribute('data-category', project.category);

        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <div class="portfolio-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="portfolio-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <button class="view-project-btn">View Project</button>
                    </div>
                </div>
            </div>
        `;

        // Add faster hover effects to new items
        portfolioItem.style.transition = 'transform 0.2s ease-out';
        portfolioItem.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        portfolioItem.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });

        return portfolioItem;
    }

    // Set data-category attributes for existing portfolio items
    const existingItems = document.querySelectorAll('.portfolio-item');
    existingItems.forEach((item, index) => {
        const categories = ['3d-rendering', 'animation', 'character', 'environment', 'vr', 'animation'];
        if (categories[index]) {
            item.setAttribute('data-category', categories[index]);
        }
    });

    // Initialize load more button text
    if (loadMoreBtn && additionalProjects.length > 0) {
        loadMoreBtn.textContent = `Load More Projects (${additionalProjects.length} available)`;
    }

    // Add loading animation - faster hero animations
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');

        // Faster hero animations - reduced intervals
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 100)); // Reduced from 200 + (index * 200)
        });
    });
});

// Utility function for faster number counting animation
function animateNumber(element, target, duration = 1000) { // Reduced from 2000ms to 1000ms
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 16);
}

// Animate stats numbers when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = parseInt(statNumber.textContent);
            animateNumber(statNumber, targetValue);
            statsObserver.unobserve(statNumber);
        }
    });
});

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});