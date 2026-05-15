// ========== FANARTS (game characters, etc.) ==========
const categoryArtworks = [
    { image: "images/toph.jpg", title: "TOPH", tweetUrl: "https://x.com/saint_mikha/status/2044710737776660861", date: "2026-04-16" },
	{ image: "images/qiqi.jpg", title: "QIQI", tweetUrl: "https://x.com/art_jahoda/status/2031384367843651680", date: "2026-03-10" },
    { image: "images/jahoda.jpg", title: "JAHODA", tweetUrl: "https://x.com/art_jahoda/status/2007073201453678592", date: "2026-01-02" },
	{ image: "images/sandrone.jpg", title: "SANDRONE", tweetUrl: "https://x.com/art_jahoda/status/2006692133420650544", date: "2026-01-01" },
	{ image: "images/chiitan.jpg", title: "CHIITAN", tweetUrl: "https://x.com/saint_mikha/status/1822689645190373712", date: "2024-08-12" }
    // Add more fanarts here
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