// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Scroll to top button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission (only if form exists)
const enrollmentForm = document.getElementById('enrollmentForm');
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you shortly to schedule your free consultation.');
        this.reset();
    });
}

// Success Stories Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    
    let currentSlide = 0;
    let totalSlides = 0;
    
    // All photos data
    const photos = [
        {
            src: 'img/teacherceppee-toppassers.jpg',
            alt: 'LET Top Passer',
            isTopPasser: true
        },
        {
            src: 'img/teacherceppee-toppassers1.jpg',
            alt: 'LET Top Passer',
            isTopPasser: true
        },
        {
            src: 'img/teacherceppee-toppassers2.jpg',
            alt: 'LET Top Passer',
            isTopPasser: true
        },
        {
            src: 'img/teacherceppee-toppassers3.jpg',
            alt: 'LET Top Passer',
            isTopPasser: true
        },
        {
            src: 'img/teacherceppee-passers.jpg',
            alt: 'LET Passer',
            isTopPasser: false
        },
        {
            src: 'img/teacherceppee-passers1.jpg',
            alt: 'LET Passer',
            isTopPasser: false
        },
        {
            src: 'img/teacherceppee-passers2.jpg',
            alt: 'LET Passer',
            isTopPasser: false
        },
        {
            src: 'img/teacherceppee-passers3.jpg',
            alt: 'LET Passer',
            isTopPasser: false
        }
    ];
    
    function getPhotosPerSlide() {
        if (window.innerWidth >= 1280) {
            return 3; // Desktop: 3 photos per slide
        } else if (window.innerWidth >= 1005) {
            return 2; // Tablet (1005px+): 2 photos per slide
        } else if (window.innerWidth >= 768) {
            return 2; // Medium tablet: 2 photos per slide
        } else {
            return 1; // Mobile: 1 photo per slide
        }
    }
    
    function createPhotoElement(photo) {
        const photoClass = photo.isTopPasser ? 'object-contain bg-white' : 'object-cover';
        return `
            <div class="text-center">
                <div class="mb-4">
                    <img src="${photo.src}" 
                         alt="${photo.alt}" 
                         class="w-full h-80 ${photoClass} rounded-lg shadow-lg">
                </div>
            </div>
        `;
    }
    
    function createSlide(photosInSlide, photosPerSlide) {
        let gridClass;
        
        if (photosPerSlide === 3) {
            gridClass = 'grid-cols-3';
        } else if (photosPerSlide === 2) {
            gridClass = 'grid-cols-2';
        } else {
            gridClass = 'grid-cols-1';
        }
        
        const photosHTML = photosInSlide.map(photo => createPhotoElement(photo)).join('');
        
        return `
            <div class="w-full flex-shrink-0">
                <div class="grid ${gridClass} gap-8 justify-items-center max-w-4xl mx-auto">
                    ${photosHTML}
                </div>
            </div>
        `;
    }
    
    function generateSlides() {
        const photosPerSlide = getPhotosPerSlide();
        const slides = [];
        
        for (let i = 0; i < photos.length; i += photosPerSlide) {
            const photosInSlide = photos.slice(i, i + photosPerSlide);
            slides.push(createSlide(photosInSlide, photosPerSlide));
        }
        
        return slides;
    }
    
    function createDots(numSlides) {
        const dots = [];
        for (let i = 0; i < numSlides; i++) {
            const activeClass = i === 0 ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400';
            dots.push(`
                <button class="dot w-3 h-3 rounded-full ${activeClass} transition-all duration-300" data-slide="${i}"></button>
            `);
        }
        return dots.join('');
    }
    
    function updateCarousel() {
        const slides = generateSlides();
        totalSlides = slides.length;
        
        // Make sure currentSlide doesn't exceed totalSlides
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        
        // Update slides
        track.innerHTML = slides.join('');
        
        // Update dots
        dotsContainer.innerHTML = createDots(totalSlides);
        
        // Set transform
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Add event listeners to new dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateActiveStates();
            });
        });
        
        updateActiveStates();
    }
    
    function updateActiveStates() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.remove('bg-gray-300', 'hover:bg-gray-400');
                dot.classList.add('bg-green-600');
            } else {
                dot.classList.remove('bg-green-600');
                dot.classList.add('bg-gray-300', 'hover:bg-gray-400');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateActiveStates();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateActiveStates();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
    
    // Auto-play functionality (optional)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Start auto-play on load
    // startAutoPlay();
    
    // Pause auto-play on hover
    const sliderContainer = document.getElementById('testimonialSlider');
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
    
    // Initial setup
    updateCarousel();
});

// Animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});
