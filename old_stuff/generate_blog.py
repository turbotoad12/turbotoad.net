#!/usr/bin/env python3
"""
Blog generator: converts markdown files in posts/ to JSON index
Run: python3 generate_blog.py
"""

import os
import json
from pathlib import Path
from datetime import datetime


def extract_frontmatter(content):
    """Parse YAML-like frontmatter from markdown"""
    lines = content.split('\n')
    meta = {}
    content_start = 0
    
    if lines[0].strip() == '---':
        content_start = 1
        for i, line in enumerate(lines[1:], 1):
            if line.strip() == '---':
                content_start = i + 1
                break
            key, _, val = line.partition(':')
            meta[key.strip()] = val.strip()
    
    return meta, '\n'.join(lines[content_start:]).strip()


def generate_blog_index():
    """Scan posts/ directory and generate index.json"""
    posts_dir = Path('posts')
    posts = []
    
    if not posts_dir.exists():
        print("posts/ directory not found")
        return
    
    # Find all .md files
    for md_file in sorted(posts_dir.glob('*.md'), reverse=True):
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        meta, body = extract_frontmatter(content)
        
        # Generate slug from filename
        slug = md_file.stem
        
        post = {
            'id': slug,
            'title': meta.get('title', 'Untitled'),
            'date': meta.get('date', 'Unknown'),
            'excerpt': meta.get('excerpt', body[:150] + '...'),
            'content': body,
        }
        posts.append(post)
    
    # Write index.json
    with open('posts/index.json', 'w', encoding='utf-8') as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
    
    print(f"Generated posts/index.json with {len(posts)} posts")


if __name__ == '__main__':
    generate_blog_index()
    # Update sitemap (if helper available)
    try:
        from generate_sitemap import generate_sitemap
        generate_sitemap()
    except Exception:
        pass
