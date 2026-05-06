#!/usr/bin/env python3
"""
Collections generator: scans collections/ folders for JPGs and generates index.json
Run: python3 generate_collections.py
"""

import os
import json
from pathlib import Path


def generate_collections_index():
    """Scan collections/ directory and generate index.json"""
    collections_dir = Path('collections')
    collections = []
    
    if not collections_dir.exists():
        print("collections/ directory not found")
        return
    
    # Scan for subdirectories (each is a collection)
    for collection_folder in sorted(collections_dir.iterdir()):
        if not collection_folder.is_dir() or collection_folder.name.startswith('.'):
            continue
        
        collection_name = collection_folder.name
        
        # Look for meta.json, if not found use defaults
        meta_file = collection_folder / 'meta.json'
        if meta_file.exists():
            with open(meta_file, 'r', encoding='utf-8') as f:
                meta = json.load(f)
        else:
            meta = {
                'title': collection_name.replace('-', ' ').title(),
                'description': ''
            }
        
        # Find all JPG files in this collection
        jpg_files = sorted([f.name for f in collection_folder.glob('*.jpg')])
        jpg_files += sorted([f.name for f in collection_folder.glob('*.JPG')])
        jpg_files += sorted([f.name for f in collection_folder.glob('*.jpeg')])
        jpg_files += sorted([f.name for f in collection_folder.glob('*.JPEG')])
        
        if jpg_files:
            # Check if any file has * to mark it as thumbnail
            thumbnail_file = None
            
            for jpg_file in jpg_files:
                if '*' in jpg_file:
                    # This file is marked as thumbnail, keep the * in the path
                    thumbnail_file = jpg_file
                    break
            
            # If no file was marked with *, use the first one
            if thumbnail_file is None:
                thumbnail_file = jpg_files[0]
            
            collection = {
                'id': collection_name,
                'title': meta.get('title', collection_name.replace('-', ' ').title()),
                'description': meta.get('description', ''),
                'images': [f'collections/{collection_name}/{img}' for img in jpg_files],
                'thumbnail': f'collections/{collection_name}/{thumbnail_file}'
            }
            collections.append(collection)
    
    # Write index.json
    with open('collections/index.json', 'w', encoding='utf-8') as f:
        json.dump(collections, f, indent=2, ensure_ascii=False)
    
    print(f"Generated collections/index.json with {len(collections)} collections")


if __name__ == '__main__':
    generate_collections_index()
    # Update sitemap (if helper available)
    try:
        from generate_sitemap import generate_sitemap
        generate_sitemap()
    except Exception:
        pass
