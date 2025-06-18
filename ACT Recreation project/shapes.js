function createShape() {
    const container = document.querySelector('.shapes-container');
    const shape = document.createElement('div');
    const shapes = ['shape', 'shape square', 'shape triangle'];
    shape.className = shapes[Math.floor(Math.random() * shapes.length)];

    const size = Math.random() * 30 + 20; // Slightly smaller shapes for more density
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    shape.style.left = `${Math.random() * 100}vw`;
    shape.style.top = `${Math.random() * 80}vh`;

    // Faster animation
    shape.style.animationDuration = `${Math.random() * 10 + 5}s`; // 5 to 15 seconds
    shape.style.animationDelay = `${Math.random() * 3}s`; // Random delay up to 3 seconds

    container.appendChild(shape);

    setTimeout(() => {
        shape.remove(); // Remove shapes after 15 seconds instead of 25 for faster turnover
    }, 10000); // Reduce shape lifetime
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        const shapesContainer = document.querySelector('.shapes-container');
        if (shapesContainer) {
            shapesContainer.style.opacity = '1'; // Ensure shapes are visible
            setInterval(() => createShape(), 350); 
        }
    }, 0); // Reduced delay for earlier start
});

document.addEventListener("DOMContentLoaded", function () {
    let sliderImages = document.querySelectorAll(".slider-img");
    let totalImages = sliderImages.length;
    let middleIndex = Math.floor(totalImages / 2);  // Middle index
    let activeIndex = middleIndex;  // Start at the middle image
    let autoSwitchInterval = 5000;  // 5 seconds for auto-switch
    let idleTimeout = 10000;  // 10 seconds of idleness before auto-switch resumes
    let autoPlayTimer, idleTimer;

    function setActiveImage(index) {
        sliderImages.forEach((img, i) => {
            img.classList.remove("active");
            if (i === index) {
                img.classList.add("active");
            }
        });
    }

    function autoPlay() {
        activeIndex = 0;  // Start autoplay from the leftmost image
        setActiveImage(activeIndex);
        autoPlayTimer = setInterval(() => {
            activeIndex = (activeIndex + 1) % totalImages;  // Cycle through images
            setActiveImage(activeIndex);
        }, autoSwitchInterval);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);  // Stop auto-play
        clearTimeout(idleTimer);  // Clear any existing idle timer

        // Resume auto-play after idle time
        idleTimer = setTimeout(() => {
            autoPlay();  // Restart auto-play from the first image
        }, idleTimeout);
    }

    // Display the middle image initially
    setActiveImage(middleIndex);

    // Start autoplay after showing the middle image
    setTimeout(() => {
        autoPlay();  // Begin autoplay from the leftmost image
    }, autoSwitchInterval);

    // Event listener for clicking an image
    sliderImages.forEach((img, index) => {
        img.addEventListener("mouseover", () => {
            clearInterval(autoPlayTimer);  // Stop auto-play on click
            setActiveImage(index);  // Set the clicked image as active
            activeIndex = index;  // Update the active index
            resetAutoPlay();  // Resume auto-play after idleness
        });
        
    });
});

function createSliderContainerShape() {
    const container = document.querySelector('.slider-container-shapes');
    if (!container) {
        console.error('Error: .slider-container-shapes element not found!');
        return; // Avoid errors if the container is not found
    }

    const shape = document.createElement('div');
    const shapeTypes = ['shape circle', 'shape square', 'shape triangle'];
    const colors = ['blue', 'orange', 'red']; // Available colors

    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    shape.className = ` shape ${shapeType} ${color}`; // Combine shape type and color

    // Set size and position
    const size = Math.random() * 30 + 20; // Random size between 20px and 50px
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    if (shape.className.includes('diamond')) {
        shape.style.transform = 'rotate(45deg)'; // Rotate diamond shape
    }

    shape.style.left = `${Math.random() * 100}%`; // Random horizontal position
    shape.style.top = `${Math.random() * 100}%`;  // Random vertical position

    shape.style.animationDuration = `${Math.random() * 10 + 5}s`; // Float duration (5-15 seconds)
    shape.style.animationDelay = `${Math.random() * 3}s`;          // Random animation delay

    container.appendChild(shape); // Add the shape to the container

    setTimeout(() => {
        shape.remove(); // Remove shape after 15 seconds to avoid clutter
    }, 10000);
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        const sliderShapesContainer = document.querySelector('.slider-container-shapes');
        if (sliderShapesContainer) {
            sliderShapesContainer.style.opacity = '1'; // Ensure container is visible
            setInterval(() => createSliderContainerShape(), 350); // Add new shape every 750ms
        } else {
            console.error('Error: .slider-container-shapes container not found!');
        }
    }, 0); // Start shape creation after 2 seconds
});

document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.link-list li');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Animation triggers when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add animation when section is visible
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-list-item');
                    }, index * 500); // Add delay for staggered effect
                });
            } else {
                // Remove animation when section goes out of view
                listItems.forEach((item) => {
                    item.classList.remove('animate-list-item');
                });
            }
        });
    });

    const section = document.querySelector('.background-image-section'); // Change to your section's class
    if (section) {
        observer.observe(section);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.slider-image img');
    const navButtons = document.querySelectorAll('.slider-nav button');
    const sliderBackground = document.querySelector('.slider-background');
    const slider = document.querySelector('.image-slider');
    const slides = document.querySelectorAll('.slider-image');
    let currentIndex = 0;
    const intervalTime = 3000;  // 3 seconds per slide
    let autoplayInterval;

    function updateBackgroundImage(index) {
        const imageUrl = images[index].src;
        if (imageUrl) {
            sliderBackground.style.backgroundImage = `url(${imageUrl})`;
        }
    }

    function goToSlide(index) {
        const slideWidth = slides[0].offsetWidth + 20;  // Account for 40px gap between images
        slider.style.transform = `translateX(calc(50% - ${slideWidth / 2}px - ${index * slideWidth}px))`;
        navButtons.forEach((btn) => btn.classList.remove('active'));
        navButtons[index].classList.add('active');
        updateBackgroundImage(index);  // Update background
        currentIndex = index;
    }
    

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }, intervalTime);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();  // Stop autoplay when manually clicked
        });
    });

    slider.addEventListener('mouseenter', stopAutoplay);  // Pause autoplay on hover
    slider.addEventListener('mouseleave', startAutoplay);  // Resume autoplay on mouse leave

    window.addEventListener('resize', () => {
        goToSlide(currentIndex);  // Ensure slides are repositioned on resize
    });

    startAutoplay();  // Start autoplay on load
    updateBackgroundImage(0);  // Set initial background
});