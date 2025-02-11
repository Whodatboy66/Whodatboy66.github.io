/* script.js */
document.addEventListener("DOMContentLoaded", function() {
    // Toggle Dark/Light Mode with smooth transition
    document.getElementById('mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
    });

    // Accordion functionality for Background & Story section
    var accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            var accordionItem = this.parentElement;
            // Toggle active state on this item
            accordionItem.classList.toggle('active');
            var content = this.nextElementSibling;
            if (accordionItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

    // -------------------------------
    // Carousel functionality for Gallery
    // -------------------------------
    let currentSlide = 0;
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);

    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        console.log("Updating carousel: currentSlide =", currentSlide, "slideWidth =", slideWidth);
        track.style.transform = 'translateX(-' + (currentSlide * slideWidth) + 'px)';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        console.log("Next Slide: currentSlide =", currentSlide);
        updateCarousel();
    }


    // Attach event listeners to the carousel buttons
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
});

// Toggle display of Connection Bio in card so that only one is active at a time
function toggleConnection(element) {
    // Collapse all connection cards except the one clicked
    var connectionCards = document.querySelectorAll('.connection-card');
    connectionCards.forEach(card => {
        if (card !== element) {
            card.classList.remove('active');
            var bio = card.querySelector('.connection-bio');
            if (bio) {
                bio.style.display = "none";
            }
        }
    });
    // Toggle active state on the clicked card
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        element.querySelector('.connection-bio').style.display = "none";
    } else {
        element.classList.add('active');
        element.querySelector('.connection-bio').style.display = "block";
    }
}

// Show Asset Detail in-place and highlight the selected asset card
// Show Asset Detail in-place and highlight the selected asset card
function showAssetDetail(assetId, element) {
    // Remove active class from all asset cards
    let assetCards = document.querySelectorAll('.asset-card');
    assetCards.forEach(card => {
        card.classList.remove('active');
    });

    // Add active class to the clicked asset card
    // (this now works because 'element' is passed from the HTML)
    element.classList.add('active');

    var assetContent = document.getElementById('asset-content');
    if (assetId === 'asset1') {
        assetContent.innerHTML = "<h3>Richter Holdings Group</h3><p>The multinational corporation masking his criminal empire.</p>";
    } else if (assetId === 'asset2') {
        assetContent.innerHTML = "<h3>Custom Vehicle</h3><p>Details about the custom vehicle...</p>";
    } else if (assetId === 'asset3') {
        assetContent.innerHTML = "<h3>High-tech Gadgets</h3><p>Details about the high-tech gadgets...</p>";
    }

    document.getElementById('asset-detail').style.display = "block";
}


// Close Asset Detail box and remove active state from asset cards
function closeAssetDetail() {
    document.getElementById('asset-detail').style.display = "none";
    let assetCards = document.querySelectorAll('.asset-card');
    assetCards.forEach(card => {
        card.classList.remove('active');
    });
}

// Search functionality: When the user presses Enter in the search bar,
// if the query (e.g., "profile", "background", etc.) matches a section,
// the page smoothly scrolls to that section.
document.getElementById('search').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        var query = this.value.toLowerCase();
        var sections = {
            "home": "home",
            "profile": "about",
            "about": "about",
            "background": "background",
            "personality": "personality",
            "connections": "connections",
            "assets": "assets",
            "skills": "skills",
            "gallery": "gallery"
        };
        for (var key in sections) {
            if (key.indexOf(query) !== -1) {
                document.getElementById(sections[key]).scrollIntoView({ behavior: "smooth" });
                break;
            }
        }
    }
});

// Optional Lightbox functionality for gallery images (if desired)
function openLightbox(src, captionText) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var caption = lightbox.querySelector('.caption');
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    caption.textContent = captionText || "";
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}
