// ========== FULL GALLERY DATA (5x5 = 25 items) ==========
// Replace with your own images, titles, tweet URLs, and dates
const allArtworks = [
	{ image: "images/valentine2.jpg", title: "VALENTINE 2", tweetUrl: "https://x.com/saint_mikha/status/2052361571683402153", date: "2026-05-07" },
	{ image: "images/solosis.png", title: "SOLOSIS", tweetUrl: "https://x.com/saint_mikha/status/2052274231539572952", date: "2026-05-07" },
    { image: "images/valentine-trend1.jpg", title: "VALENTINE", tweetUrl: "https://x.com/saint_mikha/status/2051523363638755368", date: "2026-05-05" },
    { image: "images/toph.jpg", title: "TOPH", tweetUrl: "https://x.com/saint_mikha/status/2044710737776660861", date: "2026-04-16" },
    { image: "images/gwyn.jpg", title: "GWYN", tweetUrl: "https://x.com/art_jahoda/status/2038452362122236381", date: "2026-03-30" },
	{ image: "images/qiqi.jpg", title: "QIQI", tweetUrl: "https://x.com/art_jahoda/status/2031384367843651680", date: "2026-03-10" },
    { image: "images/jahoda.jpg", title: "JAHODA", tweetUrl: "https://x.com/art_jahoda/status/2007073201453678592", date: "2026-01-02" },
	{ image: "images/sandrone.jpg", title: "SANDRONE", tweetUrl: "https://x.com/art_jahoda/status/2006692133420650544", date: "2026-01-01" },
    { image: "images/wooper.jpg", title: "WOOPER", tweetUrl: "https://x.com/art_jahoda/status/1925552249612509500", date: "2025-05-22" },
    { image: "images/baltoy.jpg", title: "BALTOY", tweetUrl: "https://x.com/art_jahoda/status/1924124750630306296", date: "2025-05-18" },
    { image: "images/magnemite.jpg", title: "MAGNEMITE", tweetUrl: "https://x.com/art_jahoda/status/1920067743694393574", date: "2025-05-07" },
    { image: "images/froslass.jpg", title: "FROSLASS", tweetUrl: "https://x.com/art_jahoda/status/1918588466624925957", date: "2025-05-03" },
    { image: "images/chiitan.jpg", title: "CHIITAN", tweetUrl: "https://x.com/saint_mikha/status/1822689645190373712", date: "2024-08-12" },	
    // Add 22 more entries below (total 25)
    // Template:
    // { image: "images/art4.jpg", title: "TITLE", tweetUrl: "URL", date: "YYYY-MM-DD" },
];

// ========== RENDER FULL GALLERY ==========
function renderFullGallery() {
    const container = document.getElementById('full-gallery-grid');
    if (!container) return;
    container.innerHTML = "";
    allArtworks.forEach(art => {
        const card = document.createElement('div');
        card.className = 'art-card';
        
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'image-wrapper';
        const img = document.createElement('img');
        img.src = art.image;
        img.alt = art.title;
        img.className = 'art-image';
        img.loading = 'lazy';
        imgWrapper.appendChild(img);
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'art-title';
        const link = document.createElement('a');
        link.href = art.tweetUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = art.title;
        titleDiv.appendChild(link);
        
        const dateDiv = document.createElement('div');
        dateDiv.className = 'art-date';
        dateDiv.textContent = art.date;
        
        card.appendChild(imgWrapper);
        card.appendChild(titleDiv);
        card.appendChild(dateDiv);
        
        imgWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            // openLightbox is defined in script.js (global)
            if (typeof openLightbox === 'function') {
                openLightbox(art.image);
            }
        });
        
        container.appendChild(card);
    });
}

// Wait for DOM to load and lightbox functions to be available
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderFullGallery();
    });
} else {
    renderFullGallery();
}
