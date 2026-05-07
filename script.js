// ========== ARTWORK DATA ==========
const featuredArtworks = [
    { image: "images/valentine-trend1.jpg", title: "VALENTINE", tweetUrl: "https://x.com/saint_mikha/status/2051523363638755368" },
    { image: "images/jahoda.jpg", title: "JAHODA", tweetUrl: "https://x.com/art_jahoda/status/2007073201453678592" },
    { image: "images/wooper.jpg", title: "WOOPER", tweetUrl: "https://x.com/art_jahoda/status/1925552249612509500" }
];

const canvas = document.getElementById('vaporwaveCanvas');
let ctx = canvas ? canvas.getContext('2d') : null;

// ========== ANIMATION PARAMETERS ==========
const FALL_DURATION = 1.0;
const STAGGER = 0.2;
const NUM_LINES = Math.round(FALL_DURATION / STAGGER);

let horizonY = 0;
let fallDistance = 0;
let acceleration = 0;
let lines = [];
let animStartTime = 0;

function resizeAndReset() {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    horizonY = canvas.height * 0.45;
    fallDistance = canvas.height - horizonY;
    acceleration = (2 * fallDistance) / (FALL_DURATION * FALL_DURATION);
    
    lines = [];
    for (let i = 0; i < NUM_LINES; i++) {
        lines.push({ startOffset: i * STAGGER });
    }
    animStartTime = performance.now() / 1000;
}

function draw() {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    const grad = ctx.createLinearGradient(0, 0, 0, horizonY);
    grad.addColorStop(0, '#341539');
    grad.addColorStop(1, '#C11C84');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, horizonY);
    
    const now = performance.now() / 1000;
    const elapsed = now - animStartTime;
    for (let i = 0; i < lines.length; i++) {
        const offset = lines[i].startOffset;
        let t = (elapsed - offset) % FALL_DURATION;
        if (t < 0) t += FALL_DURATION;
        if (t >= FALL_DURATION) continue;
        const y = horizonY + 0.5 * acceleration * t * t;
        if (y < 0 || y > h) continue;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 2.5;
        ctx.stroke();
    }
    
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(w, horizonY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(w, horizonY);
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 6;
    ctx.stroke();
    
    const topSpacing = 40;
    const bottomSpacing = topSpacing * 5;
    const numPoints = 45;
    const totalTop = (numPoints-1) * topSpacing;
    const startX = (w - totalTop) / 2;
    const topX = Array.from({length:numPoints}, (_,i) => startX + i * topSpacing);
    const totalBottom = (numPoints-1) * bottomSpacing;
    const startBottomX = (w - totalBottom) / 2;
    const bottomX = Array.from({length:numPoints}, (_,i) => startBottomX + i * bottomSpacing);
    for (let i = 0; i < numPoints; i++) {
        ctx.beginPath();
        ctx.moveTo(topX[i], horizonY);
        ctx.lineTo(bottomX[i], h);
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        let off = bottomX[i] > topX[i] ? -3 : 3;
        if (Math.abs(bottomX[i]-topX[i]) < 1) off = 0;
        ctx.beginPath();
        ctx.moveTo(topX[i]+off, horizonY);
        ctx.lineTo(bottomX[i]+off, h);
        ctx.strokeStyle = 'rgba(255,0,255,0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
    
    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => resizeAndReset());
resizeAndReset();
draw();

// ========== ARTWORK PROTECTION ==========
function protectImages() {
    document.querySelectorAll('.art-image').forEach(img => {
        img.addEventListener('contextmenu', (e) => e.preventDefault());
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

// ========== LIGHTBOX PROTECTION (does NOT block clicks) ==========
function protectLightboxImage() {
    const lbImg = document.getElementById('lightbox-img');
    if (!lbImg) return;
    lbImg.addEventListener('contextmenu', (e) => e.preventDefault());
    lbImg.addEventListener('dragstart', (e) => e.preventDefault());
}

function addLightboxOverlay() {
    const lightboxDiv = document.getElementById('lightbox');
    if (!lightboxDiv) return;
    const existing = lightboxDiv.querySelector('.no-download-overlay');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'no-download-overlay';
    overlay.textContent = '✧ NO DOWNLOAD ✧';
    overlay.style.position = 'absolute';
    overlay.style.bottom = '16px';
    overlay.style.right = '16px';
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.color = '#FF00FF';
    overlay.style.fontFamily = "'VCR', monospace";
    overlay.style.fontSize = '0.7rem';
    overlay.style.padding = '4px 10px';
    overlay.style.borderRadius = '20px';
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1002';
    overlay.style.whiteSpace = 'nowrap';
    overlay.style.letterSpacing = '1px';
    lightboxDiv.style.position = 'relative';
    lightboxDiv.appendChild(overlay);
}

// ========== IMPROVED SHORTCUT PREVENTION ==========
function disableShortcuts(e) {
    // Prevent Ctrl+S, Ctrl+P, Ctrl+I, Ctrl+U
    if (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'i' || e.key === 'u')) {
        e.preventDefault();
        return false;
    }
    // Prevent F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Prevent PrintScreen (alone)
    if (e.code === 'PrintScreen') {
        e.preventDefault();
        return false;
    }
    // Prevent Alt+PrintScreen
    if (e.altKey && e.code === 'PrintScreen') {
        e.preventDefault();
        return false;
    }
    // Prevent Win+PrintScreen (metaKey + PrintScreen)
    if (e.metaKey && e.code === 'PrintScreen') {
        e.preventDefault();
        return false;
    }
    // Prevent Win+Shift+S (Windows snipping tool)
    if (e.metaKey && e.shiftKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
    // Prevent Ctrl+Shift+C (inspect)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
    // Prevent Ctrl+U (view source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    return true;
}

// Apply all protections
function applyProtections() {
    protectImages();
    protectLightboxImage();
    addLightboxOverlay();
    document.addEventListener('keydown', disableShortcuts);
}

// Watch for dynamically added gallery images
const observer = new MutationObserver(() => {
    protectImages();
});
observer.observe(document.body, { childList: true, subtree: true });

applyProtections();

// ========== RENDER GALLERY ==========
function renderGallery(containerId, artworks) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    artworks.forEach(art => {
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
        link.textContent = art.title;
        titleDiv.appendChild(link);
        card.appendChild(imgWrap);
        card.appendChild(titleDiv);
        imgWrap.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(art.image);
        });
        container.appendChild(card);
    });
    protectImages();
}

// ========== LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    protectLightboxImage();
    addLightboxOverlay();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
}

if (lightbox) lightbox.addEventListener('click', closeLightbox);
if (lightboxImg) lightboxImg.addEventListener('click', e => e.stopPropagation());

// ========== FOOTER ==========
const yearSpan = document.getElementById('currentYear');
if (yearSpan) yearSpan.innerText = new Date().getFullYear();
const twitterFooter = document.getElementById('twitterFooter');
if (twitterFooter) twitterFooter.href = 'https://x.com/saint_mikha';

// ========== START ==========
renderGallery('featured-grid', featuredArtworks);
