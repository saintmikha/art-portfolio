// ========== ARTWORK DATA ==========
const featuredArtworks = [
    { image: "images/valentine-trend1.jpg", title: "VALENTINE", tweetUrl: "https://x.com/saint_mikha/status/2051523363638755368" },
    { image: "images/jahoda.jpg", title: "JAHODA", tweetUrl: "https://x.com/art_jahoda/status/2007073201453678592" },
    { image: "images/wooper.jpg", title: "WOOPER", tweetUrl: "https://x.com/art_jahoda/status/1925552249612509500" }
];

const canvas = document.getElementById('vaporwaveCanvas');
let ctx = canvas ? canvas.getContext('2d') : null;

// ========== ANIMATION PARAMETERS ==========
const FALL_DURATION = 1.0;        // seconds from horizon to bottom
const STAGGER = 0.2;              // seconds between line starts
const NUM_LINES = Math.round(FALL_DURATION / STAGGER); // = 10

let horizonY = 0;                 // y coordinate of horizon (center)
let fallDistance = 0;             // pixels from horizon to bottom
let acceleration = 0;             // pixels/s² (calculated)
let lines = [];                   // each line: { startOffset }
let animStartTime = 0;

// ========== UPDATE ON RESIZE ==========
function resizeAndReset() {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    horizonY = canvas.height * 0.45;
    fallDistance = canvas.height - horizonY;
    // For constant acceleration from rest: D = 0.5 * a * t² -> a = 2D / t²
    acceleration = (2 * fallDistance) / (FALL_DURATION * FALL_DURATION);
    
    // Create lines with equally spaced start offsets
    lines = [];
    for (let i = 0; i < NUM_LINES; i++) {
        lines.push({ startOffset: i * STAGGER });
    }
    animStartTime = performance.now() / 1000;
}

// ========== DRAW ==========
function draw() {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    // Gradient above horizon
    const grad = ctx.createLinearGradient(0, 0, 0, horizonY);
    grad.addColorStop(0, '#341539');
    grad.addColorStop(1, '#C11C84');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, horizonY);
    
    // Sun
    const sunR = Math.min(w, h) * 0.24;
    ctx.beginPath();
    ctx.arc(w/2, horizonY, sunR, Math.PI, 2 * Math.PI);
    ctx.fillStyle = '#eef39f';
    ctx.fill();
    
    // Moving horizontal lines (easing in)
    const now = performance.now() / 1000;
    const elapsed = now - animStartTime;
    for (let i = 0; i < lines.length; i++) {
        const offset = lines[i].startOffset;
        // Cycle time = FALL_DURATION (1 second)
        let t = (elapsed - offset) % FALL_DURATION;
        if (t < 0) t += FALL_DURATION;
        if (t >= FALL_DURATION) continue;
        // y = horizonY + 0.5 * a * t²
        const y = horizonY + 0.5 * acceleration * t * t;
        if (y < 0 || y > h) continue;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = '#ff00ff';        // solid magenta
        ctx.lineWidth = 2.5;
        ctx.stroke();
    }
    
    // Static horizon line (white, solid)
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(w, horizonY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Diagonal lines (solid cyan)
    const topSpacing = 40;
    const bottomSpacing = topSpacing * 5;
    const numPoints = 45;
    const totalTop = (numPoints-1)*topSpacing;
    const startX = (w - totalTop)/2;
    const topX = Array.from({length:numPoints}, (_,i)=>startX + i*topSpacing);
    const totalBottom = (numPoints-1)*bottomSpacing;
    const startBottomX = (w - totalBottom)/2;
    const bottomX = Array.from({length:numPoints}, (_,i)=>startBottomX + i*bottomSpacing);
    for (let i=0; i<numPoints; i++) {
        ctx.beginPath();
        ctx.moveTo(topX[i], horizonY);
        ctx.lineTo(bottomX[i], h);
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => resizeAndReset());
resizeAndReset();
draw();

// ========== GALLERY, LIGHTBOX, FOOTER (unchanged) ==========
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
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
function openLightbox(src) { lightboxImg.src = src; lightbox.classList.add('active'); }
function closeLightbox() { lightbox.classList.remove('active'); lightboxImg.src = ''; }
if (lightbox) lightbox.addEventListener('click', closeLightbox);
if (lightboxImg) lightboxImg.addEventListener('click', e => e.stopPropagation());

const yearSpan = document.getElementById('currentYear');
if (yearSpan) yearSpan.innerText = new Date().getFullYear();
const twitterFooter = document.getElementById('twitterFooter');
if (twitterFooter) twitterFooter.href = 'https://x.com/saint_mikha';

renderGallery('featured-grid', featuredArtworks);