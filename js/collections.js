/**
 * Collections system: loads and displays photo collections
 */

let allCollections = [];

// Load collections from index.json
export async function loadCollections() {
    try {
        const response = await fetch('/collections/index.json');
        if (!response.ok) throw new Error('Failed to load collections');
        allCollections = await response.json();
        return allCollections;
    } catch (error) {
        console.error('Error loading collections:', error);
        return [];
    }
}

// Get all collections
export function getCollections() {
    return allCollections;
}

// Render collections grid
export function renderCollectionsGrid(container) {
    if (!container) return;
    
    if (allCollections.length === 0) {
        container.innerHTML = '<p>No photo collections available yet. Add JPG images to the collections/ folder.</p>';
        return;
    }
    
    const collectionsHTML = allCollections.map(collection => `
        <a href="gallery.html?collection=${collection.id}" class="collection-card" style="text-decoration:none;">
            <div class="collection-image" style="background-image: url('${collection.thumbnail}')"></div>
            <div class="collection-info">
                <h3>${collection.title}</h3>
                <p>${collection.description}</p>
                <span class="image-count">${collection.images.length} photo${collection.images.length !== 1 ? 's' : ''}</span>
            </div>
        </a>
    `).join('');
    
    container.innerHTML = `
        <div class="collections-grid">
            ${collectionsHTML}
        </div>
    `;
}
