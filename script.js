/* script.js */
document.addEventListener("DOMContentLoaded", function() {
    // Dropdown functionality for Background section
    var dropdownButtons = document.querySelectorAll('.dropdown-btn');
    dropdownButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var content = this.nextElementSibling;
            content.style.display = (content.style.display === "block") ? "none" : "block";
        });
    });

    // Dark/Light mode toggle
    document.getElementById('mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
    });
});

// Toggle the display of connection bios
function toggleBio(element) {
    var bio = element.nextElementSibling;
    bio.style.display = (bio.style.display === "block") ? "none" : "block";
}

// Show detailed asset information
function showAssetDetail(assetId) {
    var assetDetail = document.getElementById('asset-detail');
    var assetContent = document.getElementById('asset-content');

    // For demonstration, static content is used based on assetId.
    if (assetId === 'asset1') {
        assetContent.innerHTML = "<h3>Secret Base</h3><p>Details about the secret base...</p>";
    } else if (assetId === 'asset2') {
        assetContent.innerHTML = "<h3>Custom Vehicle</h3><p>Details about the custom vehicle...</p>";
    } else if (assetId === 'asset3') {
        assetContent.innerHTML = "<h3>High-tech Gadgets</h3><p>Details about the high-tech gadgets...</p>";
    }

    assetDetail.style.display = "block";
}

// Close the asset detail view
function closeAssetDetail() {
    document.getElementById('asset-detail').style.display = "none";
}

// Open the lightbox for gallery images
function openLightbox(src) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = "flex";
    lightboxImg.src = src;
}

// Close the lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}

// Simple search functionality: on Enter key, scroll to a matching section
document.getElementById('search').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        var query = this.value.toLowerCase();
        // Mapping of keywords to section IDs
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
                document.getElementById(sections[key]).scrollIntoView({behavior: "smooth"});
                break;
            }
        }
    }
});
