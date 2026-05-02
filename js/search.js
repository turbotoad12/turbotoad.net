// Client-side search module — loads posts and collections and wires search inputs
async function loadIndexes() {
    const postsPromise = fetch('posts/index.json').then(r => r.ok ? r.json() : [] ).catch(() => []);
    const collectionsPromise = fetch('collections/index.json').then(r => r.ok ? r.json() : [] ).catch(() => []);
    const [posts, collections] = await Promise.all([postsPromise, collectionsPromise]);
    return { posts, collections };
}

function debounce(fn, wait){
    let t;
    return (...args)=>{ clearTimeout(t); t = setTimeout(()=>fn(...args), wait); };
}

function createResultsElement(input){
    let el = input.parentNode.querySelector('.search-results');
    if (!el) {
        el = document.createElement('div');
        el.className = 'search-results';
        input.parentNode.appendChild(el);
    }
    return el;
}

function renderResults(container, results){
    if (!results.length) {
        container.innerHTML = '<div class="no-results">No results</div>';
        return;
    }
    container.innerHTML = results.map(r => {
        const typeLabel = r.type === 'post' ? 'Post' : 'Collection';
        return `<a class="search-result" href="${r.url}" data-type="${r.type}" data-id="${r.id}">
            <div class="result-title">${r.title}</div>
            <div class="result-meta">${typeLabel} — ${r.snippet || ''}</div>
        </a>`;
    }).join('');
}

function matchItem(item, q, type){
    const hay = (item.title || '') + ' ' + (item.excerpt || '') + ' ' + (item.description || '') + ' ' + (item.content || '');
    const idx = hay.toLowerCase().indexOf(q);
    if (idx === -1) return null;
    const start = Math.max(0, idx - 20);
    const snippet = (hay.substring(start, start + 100)).replace(/\n/g, ' ');
    const id = item.id;
    const title = item.title || item.id || '';
    const url = type === 'post' ? `blog.html?post=${encodeURIComponent(id)}` : `gallery.html?collection=${encodeURIComponent(id)}`;
    return { id, title, snippet, url, type };
}

async function initSearch() {
    const { posts, collections } = await loadIndexes();

    function doSearch(q){
        const ql = q.toLowerCase();
        const postMatches = posts.map(p => matchItem(p, ql, 'post')).filter(Boolean);
        const collectionMatches = collections.map(c => matchItem(c, ql, 'collection')).filter(Boolean);
        // rank posts first then collections
        return postMatches.concat(collectionMatches).slice(0, 8);
    }

    function attachTo(input){
        if (input._searchAttached) return;
        input._searchAttached = true;
        input.setAttribute('autocomplete','off');
        const el = createResultsElement(input);

        const run = debounce(()=>{
            const q = input.value.trim();
            if (!q) { el.innerHTML = ''; el.style.display = 'none'; return; }
            const results = doSearch(q);
            renderResults(el, results);
            el.style.display = 'block';
        }, 180);

        input.addEventListener('input', run);
        input.addEventListener('keydown', (e)=>{
            if (e.key === 'Enter'){
                const q = input.value.trim();
                if (!q) return;
                const results = doSearch(q);
                if (results.length) {
                    window.location.href = results[0].url;
                }
            }
        });

        // click on result
        el.addEventListener('click', (ev)=>{
            const a = ev.target.closest('.search-result');
            if (!a) return;
            ev.preventDefault();
            window.location.href = a.getAttribute('href');
        });

        document.addEventListener('click', (ev)=>{
            if (!input.contains(ev.target) && !el.contains(ev.target)){
                el.style.display = 'none';
            }
        });
    }

    // attach to any existing inputs with class 'search'
    const inputs = Array.from(document.querySelectorAll('input.search'));
    inputs.forEach(attachTo);

    // observe for dynamically inserted headers/components
    const obs = new MutationObserver((mutations)=>{
        for (const m of mutations){
            for (const node of Array.from(m.addedNodes || [])){
                if (!(node instanceof HTMLElement)) continue;
                const found = node.querySelectorAll ? node.querySelectorAll('input.search') : [];
                found.forEach(attachTo);
                if (node.matches && node.matches('input.search')) attachTo(node);
            }
        }
    });
    obs.observe(document.body, { childList: true, subtree: true });
}

// Auto-init when module is imported
if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initSearch);
} else {
    initSearch();
}

export { initSearch };
