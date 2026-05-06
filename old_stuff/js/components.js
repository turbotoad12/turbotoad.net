/**
 * Reusable component templates for Turbotoad
 */

// Header component
export function HeaderComponent() {
    return `
    <div class="announcement-bar" role="status" aria-live="polite">
        This website is under construction.
    </div>
    <header class="site-header">
        <div class="topbar container">
            <div class="logo"><a href="/">turbotoad.net</a></div>
            <div class="top-actions">
                <input class="search" placeholder="Search" aria-label="Search site">
            </div>
        </div>
        <nav class="main-nav">
            <div class="container">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </div>
        </nav>
    </header>
    `;
}

// Blog post card component (for listing)
export function BlogPostCard(post) {
    return `
    <article class="blog-post-card">
        <time>${post.date}</time>
        <h3><a href="#/blog/${post.id}">${post.title}</a></h3>
        <p>${post.excerpt}</p>
        <a href="#/blog/${post.id}" class="read-more">Read More →</a>
    </article>
    `;
}

// Blog post detail component (for full view)
export function BlogPostDetail(post) {
    // Convert markdown-like syntax to HTML (basic)
    let html = post.content
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^- (.*?)$/gm, '<li>$1</li>')
        .replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>')
        .replace(/(<\/li>\n<li>)/g, '</li><li>');
    
    return `
    <article class="blog-post-detail">
        <header class="post-header">
            <h1>${post.title}</h1>
            <time>${post.date}</time>
        </header>
        <div class="post-content">
            <p>${html}</p>
        </div>
        <footer class="post-footer">
            <a href="#/blog" class="back-link">← Back to Blog</a>
        </footer>
    </article>
    `;
}

// Blog listing page component
export function BlogListingComponent(posts) {
    const postCards = posts.map(post => BlogPostCard(post)).join('');
    return `
    <section class="blog-listing">
        <h2>Blog Posts</h2>
        <div class="blog-posts">
            ${postCards}
        </div>
    </section>
    `;
}

// Footer component
export function FooterComponent() {
    return `
    <footer class="site-footer">
        <div class="container footer-inner">
            <div class="footer-links">Careers | Contact Us | Terms of Use</div>
            <div class="copyright">© 2026 Turbotoad. All Rights Reserved.</div>
        </div>
    </footer>
    `;
}
