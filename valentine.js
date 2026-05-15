// ========== ORIGINAL CHARACTERS ==========
const categoryArtworks = [
    { image: "images/valentine2.jpg", title: "VALENTINE 2", tweetUrl: "https://x.com/saint_mikha/status/2052361571683402153", date: "2026-05-07" },
    { image: "images/valentine-trend1.jpg", title: "VALENTINE", tweetUrl: "https://x.com/saint_mikha/status/2051523363638755368", date: "2026-05-05" }
    // Add more original characters here
];

function renderCategoryGallery() {
    const container = document.getElementById('category-gallery-grid');
    if (!container) return;
    container.innerHTML = "";
    categoryArtworks.forEach(art => {
        const card = document.createElement('div');
        card.className = 'art-card';
        const imgWrap = document.createElement('div');
        imgWrap.className = 'image-wrapper';
        const img = document.createElement('img');
        img.src = art.image;
        img.alt = art.title;
        img.className = 'art-image';
        img.loading = 'lazy';
        imgWrap.appendChild(img);
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
        card.appendChild(imgWrap);
        card.appendChild(titleDiv);
        card.appendChild(dateDiv);
        imgWrap.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof openLightbox === 'function') openLightbox(art.image);
        });
        container.appendChild(card);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCategoryGallery);
} else {
    renderCategoryGallery();
}