/**
 * Hero image rotation: cycles through collection photos
 */

import { getCollections } from './collections.js';

let allImages = [];
let currentImageIndex = 0;
let rotationInterval;

export function initHeroRotation() {
    const collections = getCollections();
    
    // Gather all images from all collections
    collections.forEach(collection => {
        allImages.push(...collection.images);
    });
    
    if (allImages.length === 0) return;
    
    // Shuffle images
    allImages = allImages.sort(() => Math.random() - 0.5);
    
    // Set initial image
    updateHeroImage();
    
    // Rotate every 5 seconds
    rotationInterval = setInterval(rotateHero, 5000);
}

function updateHeroImage() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const imagePath = allImages[currentImageIndex];
    heroSection.style.backgroundImage = `url('${imagePath}')`;
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';
    
    // Make it clickable to view full gallery
    const collection = getCollectionFromImage(imagePath);
    if (collection) {
        heroSection.style.cursor = 'pointer';
        heroSection.onclick = () => {
            window.location.href = `gallery.html?collection=${collection.id}`;
        };
    }
}

function rotateHero() {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    updateHeroImage();
}

function getCollectionFromImage(imagePath) {
    const collections = getCollections();
    for (let collection of collections) {
        if (collection.images.includes(imagePath)) {
            return collection;
        }
    }
    return null;
}

export function stopHeroRotation() {
    if (rotationInterval) clearInterval(rotationInterval);
}
