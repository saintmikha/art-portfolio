// ========== CATEGORY DATA ==========
const categories = [
    { name: "ORIGINAL CHARACTERS", link: "oc.html", bg: "images/valentine-trend1.jpg" },
    { name: "FANARTS", link: "fanart.html", bg: "images/toph.jpg" },
    { name: "POKÉMON FANARTS", link: "pokemon.html", bg: "images/wooper.jpg" },
    { name: "OTHER ARTWORKS", link: "others.html", bg: "images/gwyn.jpg" }
];

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('full-gallery-grid');
    if (!container) {
        console.error("Container #full-gallery-grid not found");
        return;
    }
    container.innerHTML = '';
    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'category-grid';
    
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        if (cat.bg) {
            card.style.backgroundImage = `url('${cat.bg}')`;
        }
        
        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'category-card-overlay';
        card.appendChild(overlay);
        
        // Title
        const title = document.createElement('h2');
        title.textContent = cat.name;
        title.className = 'category-card-title';
        
        // Button
        const button = document.createElement('button');
        button.textContent = 'CHECK IT OUT';
        button.className = 'category-card-button';
        button.onclick = (e) => {
            e.stopPropagation();
            window.location.href = cat.link;
        };
        
        card.appendChild(title);
        card.appendChild(button);
        gridWrapper.appendChild(card);
    });
    
    container.appendChild(gridWrapper);
    
    // Footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.innerText = new Date().getFullYear();
    const twitterLink = document.getElementById('twitterFooter');
    if (twitterLink) twitterLink.href = 'https://x.com/saint_mikha';
});
