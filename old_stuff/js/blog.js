/**
 * Blog system: loads posts from JSON
 */

let allPosts = [];

// Load posts from index.json
export async function loadPosts() {
    try {
        const response = await fetch('/posts/index.json');
        if (!response.ok) throw new Error('Failed to load posts');
        allPosts = await response.json();
        return allPosts;
    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
}

// Get all posts
export function getPosts() {
    return allPosts;
}

// Get a single post by ID
export function getPost(id) {
    return allPosts.find(post => post.id === id);
}
