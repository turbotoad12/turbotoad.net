/**
 * Gallery display for viewing full photo collections
 */

export function renderCollectionGallery(container, collection) {
    if (!container || !collection) {
        container.innerHTML = '<p>Collection not found.</p>';
        return;
    }
    
    const photosHTML = collection.images.map((image, idx) => `
        <div class="gallery-item" data-index="${idx}">
            <img src="${image}" alt="Photo ${idx + 1}" />
        </div>
    `).join('');
    
    container.innerHTML = `
        <div class="gallery-header">
            <h1>${collection.title}</h1>
            <p>${collection.description}</p>
            <p class="photo-count">${collection.images.length} photo${collection.images.length !== 1 ? 's' : ''}</p>
        </div>
        
        <div class="gallery-grid">
            ${photosHTML}
        </div>
        
        <div id="lightbox" class="lightbox" style="display:none;">
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">❮</button>
                <img id="lightbox-image" src="" alt="" />
                <button class="lightbox-next">❯</button>
                <div class="lightbox-counter"><span id="lightbox-current">1</span> / <span id="lightbox-total">${collection.images.length}</span></div>
            </div>
        </div>
    `;
    
    // Attach lightbox listeners
    attachGalleryListeners(collection);
}

function attachGalleryListeners(collection) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const currentSpan = document.getElementById('lightbox-current');
    
    let currentIndex = 0;
    
    function openLightbox(index) {
        currentIndex = index;
        lightboxImage.src = collection.images[currentIndex];
        currentSpan.textContent = currentIndex + 1;
        lightbox.style.display = 'flex';
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
    }
    
    function nextPhoto() {
        currentIndex = (currentIndex + 1) % collection.images.length;
        lightboxImage.src = collection.images[currentIndex];
        currentSpan.textContent = currentIndex + 1;
    }
    
    function prevPhoto() {
        currentIndex = (currentIndex - 1 + collection.images.length) % collection.images.length;
        lightboxImage.src = collection.images[currentIndex];
        currentSpan.textContent = currentIndex + 1;
    }
    
    galleryItems.forEach((item, idx) => {
        item.addEventListener('click', () => openLightbox(idx));
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevPhoto);
    nextBtn.addEventListener('click', nextPhoto);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display !== 'flex') return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
    });
}
