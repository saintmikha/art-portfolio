// ========== MEMBERSHIP PAGE – TIER LINKS ==========
// Replace these URLs with your actual Buy Me a Coffee tier links
// You can find them from your BMC membership page (each tier has its own direct link)
const tierUrls = {
    small: "https://www.buymeacoffee.com/jahoda/membership?tier=small_organelle",   // change me
    medium: "https://www.buymeacoffee.com/jahoda/membership?tier=medium_organelle",
    large: "https://www.buymeacoffee.com/jahoda/membership?tier=large_organelle",
    largest: "https://www.buymeacoffee.com/jahoda/membership?tier=largest_organelle"
};

function bindCardClicks() {
    const cards = document.querySelectorAll('.perk-card');
    if (cards.length >= 4) {
        cards[0].addEventListener('click', () => window.open(tierUrls.small, '_blank'));
        cards[1].addEventListener('click', () => window.open(tierUrls.medium, '_blank'));
        cards[2].addEventListener('click', () => window.open(tierUrls.large, '_blank'));
        cards[3].addEventListener('click', () => window.open(tierUrls.largest, '_blank'));
    }
}

// Wait for DOM to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindCardClicks);
} else {
    bindCardClicks();
}