// ========== POKÉMON FANARTS ==========
const categoryArtworks = [
    { image: "images/solosis.png", title: "SOLOSIS", tweetUrl: "https://x.com/saint_mikha/status/2052274231539572952", date: "2026-05-07" },
    { image: "images/wooper.jpg", title: "WOOPER", tweetUrl: "https://x.com/art_jahoda/status/1925552249612509500", date: "2025-05-22" },
    { image: "images/baltoy.jpg", title: "BALTOY", tweetUrl: "https://x.com/art_jahoda/status/1924124750630306296", date: "2025-05-18" },
    { image: "images/magnemite.jpg", title: "MAGNEMITE", tweetUrl: "https://x.com/art_jahoda/status/1920067743694393574", date: "2025-05-07" },
    { image: "images/froslass.jpg", title: "FROSLASS", tweetUrl: "https://x.com/art_jahoda/status/1918588466624925957", date: "2025-05-03" },
    // Add more Pokémon fanarts here
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