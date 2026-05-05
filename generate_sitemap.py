#!/usr/bin/env python3
"""
Generate sitemap.xml from posts and collections JSON indexes.
Run: python3 generate_sitemap.py
"""
import json
from pathlib import Path
from datetime import datetime


def generate_sitemap(posts_json_path='posts/index.json', collections_json_path='collections/index.json', out_path='sitemap.xml'):
    base = 'https://turbotoad.net'
    urls = []

    # Main pages
    urls.append({'loc': f'{base}/', 'changefreq': 'weekly', 'priority': '1.0'})
    urls.append({'loc': f'{base}/blog.html', 'changefreq': 'weekly', 'priority': '0.9'})
    urls.append({'loc': f'{base}/about.html', 'changefreq': 'monthly', 'priority': '0.9'})

    # Blog posts (current site routing is query-based)
    try:
        p = Path(posts_json_path)
        if p.exists():
            with open(p, 'r', encoding='utf-8') as f:
                posts = json.load(f)
            for post in posts:
                urls.append({'loc': f"{base}/blog.html?post={post['id']}", 'changefreq': 'monthly', 'priority': '0.8'})
    except Exception:
        pass

    # Collections (current site routing is query-based)
    try:
        cpath = Path(collections_json_path)
        if cpath.exists():
            with open(cpath, 'r', encoding='utf-8') as f:
                collections = json.load(f)
            for c in collections:
                urls.append({'loc': f"{base}/gallery.html?collection={c['id']}", 'changefreq': 'monthly', 'priority': '0.8'})
    except Exception:
        pass

    # Build XML
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        lines.append('  <url>')
        lines.append(f"    <loc>{u['loc']}</loc>")
        if 'lastmod' in u:
            lines.append(f"    <lastmod>{u['lastmod']}</lastmod>")
        lines.append(f"    <changefreq>{u['changefreq']}</changefreq>")
        lines.append(f"    <priority>{u['priority']}</priority>")
        lines.append('  </url>')
    lines.append('</urlset>')

    try:
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        print(f'Wrote sitemap to {out_path} ({len(urls)} URLs)')
    except Exception as e:
        print('Failed to write sitemap:', e)


if __name__ == '__main__':
    generate_sitemap()
