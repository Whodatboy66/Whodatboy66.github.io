document.addEventListener("DOMContentLoaded", function() {
    // Toggle Dark/Light Mode
    document.getElementById('mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
    });

    /**
     * Recalculates the max-height for every open accordion panel.
     * This forces both nested and top-level accordion contents to update to their
     * current scrollHeight (i.e. the full height of their content).
     */
    function updateAllAccordions() {
        var allAccordionContents = document.querySelectorAll('.accordion-content');
        allAccordionContents.forEach(function(content) {
            var parentItem = content.parentElement;
            if (parentItem.classList.contains('active')) {
                // Force reflow (optional) and set max-height to the full scrollHeight
                content.offsetHeight;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    // Accordion functionality for both top-level and nested headers
    var accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            var accordionItem = this.parentElement;
            accordionItem.classList.toggle('active');
            var content = this.nextElementSibling;

            // Toggle the current panel's max-height
            if (accordionItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0px";
            }

            // Delay a brief moment to let the transition start, then update every open panel
            setTimeout(updateAllAccordions, 50);
        });
    });

    // Carousel functionality for the Gallery remains unchanged
    let currentSlide = 0;
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (currentSlide * slideWidth) + 'px)';
    }
    window.nextSlide = function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }
    window.prevSlide = function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    // Search functionality: Scrolls to section when pressing Enter in the search box.
    document.getElementById('search').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            var query = this.value.toLowerCase();
            var sections = {
                "home": "home",
                "profile": "profile",
                "background": "background",
                "appearance": "appearance",
                "scars": "scars-tattoos",
                "tattoos": "scars-tattoos",
                "intimacy": "intimacy",
                "business": "business",
                "connections": "connections",
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
});

// Toggle display of Connection Card bios so that only one is expanded at a time
function toggleConnection(element) {
    var connectionCards = document.querySelectorAll('.connection-card');
    connectionCards.forEach(card => {
        if (card !== element) {
            card.classList.remove('active');
            var bio = card.querySelector('.connection-bio');
            if (bio) bio.style.display = "none";
        }
    });
    var bio = element.querySelector('.connection-bio');
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        bio.style.display = "none";
    } else {
        element.classList.add('active');
        bio.style.display = "block";
    }
}

// Show Asset Detail in-place and highlight the selected asset card
function showAssetDetail(assetId, element) {
    // Remove active class from all asset cards
    let assetCards = document.querySelectorAll('.asset-card');
    assetCards.forEach(card => {
        card.classList.remove('active');
    });

    // Add active class to the clicked asset card
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

// Optional Lightbox functions for gallery images
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
