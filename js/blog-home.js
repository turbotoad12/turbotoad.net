/**
 * Render latest news/blog posts on the home page
 */

import { getPosts } from './blog.js';

export function renderLatestNews() {
    const sidebarContent = document.getElementById('sidebar-content');
    if (!sidebarContent) return;
    
    const allPosts = getPosts();
    const latestNews = allPosts.slice(0, 3); // Latest 3 posts
    
    const newsHTML = `
        <div class="blog">
            <h3>Blog Posts</h3>
            <div class="blog-list">
                ${latestNews.map(post => `
                    <article class="blog-post">
                        <time>${post.date}</time>
                        <h4>${post.title}</h4>
                        <p>${post.excerpt}</p>
                        <a href="blog.html?post=${post.id}">Read More →</a>
                    </article>
                `).join('')}
            </div>
        </div>
    `;
    
    sidebarContent.innerHTML = newsHTML;
}
