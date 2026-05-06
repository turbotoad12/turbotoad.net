/**
 * Render blog page with all posts
 */

import { getPosts, getPost } from './blog.js';

// Convert markdown-like syntax to HTML (basic)
function markdownToHtml(text) {
    let html = text
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^- (.*?)$/gm, '<li>$1</li>')
        .replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>')
        .replace(/(<\/li>\n<li>)/g, '</li><li>');
    return html;
}

export function renderBlogListing(container) {
    if (!container) return;
    
    const allPosts = getPosts();
    const postsHTML = allPosts.map(post => `
        <article class="blog-post-card">
            <time>${post.date}</time>
            <h3><a href="blog.html?post=${post.id}">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <a href="blog.html?post=${post.id}" class="read-more">Read More →</a>
        </article>
    `).join('');
    
    container.innerHTML = `
        <section class="blog-listing">
            <h2>Blog Posts</h2>
            <div class="blog-posts">
                ${postsHTML}
            </div>
        </section>
    `;
}

export function renderBlogPost(container, postId) {
    if (!container) return;
    
    const post = getPost(postId);
    if (!post) {
        container.innerHTML = '<p>Post not found.</p>';
        return;
    }
    
    const htmlContent = markdownToHtml(post.content);
    
    container.innerHTML = `
        <article class="blog-post-detail">
            <header class="post-header">
                <h1>${post.title}</h1>
                <time>${post.date}</time>
            </header>
            <div class="post-content">
                <p>${htmlContent}</p>
            </div>
            <footer class="post-footer">
                <a href="blog.html" class="back-link">← Back to Blog</a>
            </footer>
        </article>
    `;
}
