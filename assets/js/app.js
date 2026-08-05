// LAN SV Store — App Logic
// Based on forge-store search.js / catalog-loader.js patterns
(function () {
    'use strict';

    // ── State ────────────────────────────────────────────────────
    var currentType = 'All';
    var currentSearch = '';

    // ── DOM refs ─────────────────────────────────────────────────
    var grid = document.getElementById('tile-grid');
    var noResults = document.getElementById('no-results');
    var countEl = document.getElementById('content-count');
    var titleEl = document.getElementById('content-title');
    var searchInput = document.getElementById('search-input');

    // ── Render ───────────────────────────────────────────────────
    function renderGrid() {
        var filtered = CATALOG.filter(function (item) {
            if (currentType !== 'All' && item.type !== currentType) return false;
            if (currentSearch) {
                var q = currentSearch.toLowerCase();
                var haystack = (item.title + ' ' + item.description + ' ' + item.tags.join(' ')).toLowerCase();
                return haystack.indexOf(q) !== -1;
            }
            return true;
        });

        if (filtered.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            countEl.textContent = '0 items';
            return;
        }
        noResults.style.display = 'none';
        countEl.textContent = filtered.length + ' item' + (filtered.length !== 1 ? 's' : '');

        grid.innerHTML = filtered.map(function (item) {
            var badgeClass = 'type-' + item.type;
            var typeLabel = item.type.replace('-', ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
            var statusClass = item.status === 'ready' ? 'ready' : 'coming-soon';
            var statusLabel = item.status === 'ready' ? '✓ Ready' : 'Coming Soon';

            return '<div class="tile-card" data-id="' + item.id + '" onclick="openDetail(\'' + item.id + '\')">' +
                '<div class="tile-top"><span class="type-badge ' + badgeClass + '">' + typeLabel + '</span></div>' +
                '<h3 class="tile-name">' + item.title + '</h3>' +
                '<p class="tile-desc">' + item.description + '</p>' +
                '<div class="tile-footer">' +
                '<div class="tile-tags">' + item.tags.slice(0, 3).map(function (t) { return '<span class="tile-tag">' + t + '</span>'; }).join('') + '</div>' +
                '<span class="tile-status ' + statusClass + '">' + statusLabel + '</span>' +
                '</div></div>';
        }).join('');
    }

    // ── Filters ──────────────────────────────────────────────────
    var typeBtns = document.querySelectorAll('.type-btn');
    typeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            typeBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentType = btn.getAttribute('data-type');
            titleEl.textContent = currentType === 'All' ? 'All Resources' : btn.textContent.trim();
            renderGrid();
        });
    });

    searchInput.addEventListener('input', function () {
        currentSearch = searchInput.value.trim();
        renderGrid();
    });

    // ── Detail Modal ─────────────────────────────────────────────
    window.openDetail = function (id) {
        var item = CATALOG.find(function (i) { return i.id === id; });
        if (!item) return;

        var modal = document.getElementById('detail-modal');
        var body = document.getElementById('detail-panel-body');
        var footer = document.getElementById('detail-panel-footer');

        var badgeClass = 'type-' + item.type;
        var typeLabel = item.type.replace('-', ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });

        body.innerHTML =
            '<span class="type-badge detail-type ' + badgeClass + '">' + typeLabel + '</span>' +
            '<h2>' + item.title + '</h2>' +
            '<p class="detail-desc">' + item.description + '</p>' +
            (item.commands ? '<div class="detail-meta"><dt>Commands</dt><dd>' + item.commands.map(function (c) { return '<code>' + c + '</code>'; }).join('<br>') + '</dd></div>' : '') +
            (item.repos ? '<div class="repo-list">' + item.repos.map(function (r) {
                var link = r.url ? '<a href="' + r.url + '" target="_blank" rel="noopener">' + r.name + '</a>' : '<span>' + r.name + '</span>';
                var clone = r.url ? '<code class="repo-clone">git clone ' + r.url + '.git</code>' : '';
                return '<div class="repo-item">' +
                    '<div class="repo-item-header">' + link + '</div>' +
                    '<div class="repo-item-desc">' + r.desc + '</div>' +
                    clone +
                    '</div>';
            }).join('') + '</div>' : '') +
            '<dl class="detail-meta">' +
            '<dt>Version</dt><dd>' + item.version + '</dd>' +
            '<dt>Author</dt><dd>' + item.author + '</dd>' +
            '<dt>Status</dt><dd>' + (item.status === 'ready' ? '✓ Ready to use' : '🚧 Coming soon') + '</dd>' +
            '<dt>Tags</dt><dd>' + item.tags.map(function (t) { return '<span class="tile-tag">' + t + '</span> '; }).join('') + '</dd>' +
            '</dl>';

        if (item.downloadUrl) {
            var dlUrl = item.downloadUrl;
            var dlName = dlUrl.split('/').pop();
            footer.innerHTML = '<a href="' + dlUrl + '" download class="btn-download" onclick="setTimeout(function(){openInstallModal(\'' + dlName + '\')},300)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download VSIX</a>';
        } else if (item.repos && item.workspaceFile) {
            footer.innerHTML = '<a href="' + item.workspaceFile + '" download class="btn-download"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Workspace File</a>';
        } else if (item.repoUrl) {
            footer.innerHTML = '<a href="' + item.repoUrl + '" target="_blank" rel="noopener" class="btn-download"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Open Resource</a>';
        }

        modal.classList.add('open');
    };

    window.closeDetailModal = function () {
        document.getElementById('detail-modal').classList.remove('open');
    };

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeDetailModal();
            closeInstallModal(e);
        }
    });

    // ── Install Modal ────────────────────────────────────────────
    window.openInstallModal = function (fileName) {
        var modal = document.getElementById('install-modal');
        // Update the modal text to reflect the actual file being downloaded
        var nameEl = modal.querySelector('.install-modal-body code');
        if (nameEl && fileName) {
            nameEl.textContent = fileName;
        }
        var allCodes = modal.querySelectorAll('.install-modal-body code');
        if (fileName) {
            allCodes.forEach(function(el) {
                if (el.textContent.match(/\.vsix$/)) el.textContent = fileName;
            });
        }
        modal.classList.add('open');
        // No duplicate download — the <a> tag already triggers it
    };

    window.closeInstallModal = function (e) {
        if (e && e.target && e.target.closest && e.target.closest('.install-modal-content')) return;
        document.getElementById('install-modal').classList.remove('open');
    };

    // ── Theme Toggle ─────────────────────────────────────────────
    var themeToggle = document.getElementById('theme-toggle');
    var sunIcon = document.getElementById('theme-icon-sun');
    var moonIcon = document.getElementById('theme-icon-moon');

    function applyTheme(theme) {
        document.documentElement.className = theme;
        document.body.className = theme;
        localStorage.setItem('lan-store-theme', theme);
        if (theme === 'light-theme') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    themeToggle.addEventListener('click', function () {
        var current = document.documentElement.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
        applyTheme(current === 'light-theme' ? 'dark-theme' : 'light-theme');
    });

    // Init theme icons
    var savedTheme = localStorage.getItem('lan-store-theme') || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark-theme' : 'light-theme');
    applyTheme(savedTheme);

    // ── Helpers ──────────────────────────────────────────────────
    window.resetFilters = function () {
        currentType = 'All';
        currentSearch = '';
        searchInput.value = '';
        typeBtns.forEach(function (b) { b.classList.remove('active'); });
        typeBtns[0].classList.add('active');
        titleEl.textContent = 'All Resources';
        renderGrid();
    };

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── Init ─────────────────────────────────────────────────────
    renderGrid();
})();
