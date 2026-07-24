/**
 * SHAH MAKHOOM HAYAT - INTERACTIVE RESUME APPLICATION JS
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Theme Switcher (dark -> light -> sepia) with LocalStorage
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    const THEMES = ['dark', 'light', 'sepia'];
    // Icon shows the theme you'll switch TO on the next click
    const THEME_ICONS = {
        dark: 'fa-solid fa-moon',
        light: 'fa-solid fa-sun',
        sepia: 'fa-solid fa-mug-hot'
    };

    const storedTheme = localStorage.getItem('theme');
    const savedTheme = THEMES.includes(storedTheme) ? storedTheme : 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    function nextTheme(theme) {
        return THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = nextTheme(htmlEl.getAttribute('data-theme'));
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        const next = nextTheme(theme);
        if (icon) {
            icon.className = THEME_ICONS[next];
            themeToggleBtn.setAttribute('title', 'Switch to ' + next.charAt(0).toUpperCase() + next.slice(1) + ' Theme');
        }
    }

    // 3. Copy to Clipboard Toast Notification
    const emailBtn = document.getElementById('email-btn');
    const toast = document.getElementById('toast');

    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const emailText = 'smhayat225@outlook.com';
            navigator.clipboard.writeText(emailText).then(() => {
                showToast(`Copied email (${emailText}) to clipboard!`);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 4. Skills Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || category === cardCat) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Experience Real-Time Keyword Search & Highlight
    const searchInput = document.getElementById('exp-search-input');
    const searchClearBtn = document.getElementById('exp-search-clear');
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Cache each bullet's original markup so highlights can be fully undone
    const bulletOriginalHTML = new Map();
    document.querySelectorAll('.achievement-list li').forEach(li => {
        bulletOriginalHTML.set(li, li.innerHTML);
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length > 0) {
                if (searchClearBtn) searchClearBtn.style.display = 'inline-block';
            } else {
                if (searchClearBtn) searchClearBtn.style.display = 'none';
            }

            timelineItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const bullets = item.querySelectorAll('.achievement-list li');
                let matchFound = false;

                if (query === '') {
                    item.style.display = 'block';
                    bullets.forEach(li => {
                        li.style.display = 'flex';
                        resetHighlight(li);
                    });
                    return;
                }

                bullets.forEach(li => {
                    const liText = li.textContent.toLowerCase();
                    if (liText.includes(query)) {
                        li.style.display = 'flex';
                        matchFound = true;
                        highlightText(li, query);
                    } else {
                        li.style.display = 'none';
                    }
                });

                if (matchFound || item.querySelector('.role-title').textContent.toLowerCase().includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        });
    }

    function highlightText(element, query) {
        // Restore pristine markup, then wrap matches in text nodes only —
        // never touches tags/attributes, so the HTML can't get corrupted.
        resetHighlight(element);

        const reg = new RegExp(escapeRegExp(query), 'gi');
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach(node => {
            const text = node.nodeValue;
            reg.lastIndex = 0;
            if (!reg.test(text)) return;
            reg.lastIndex = 0;

            const frag = document.createDocumentFragment();
            let lastIndex = 0;
            let match;
            while ((match = reg.exec(text)) !== null) {
                if (match.index > lastIndex) {
                    frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
                }
                const mark = document.createElement('mark');
                mark.className = 'search-highlight';
                mark.textContent = match[0];
                frag.appendChild(mark);
                lastIndex = match.index + match[0].length;
            }
            if (lastIndex < text.length) {
                frag.appendChild(document.createTextNode(text.slice(lastIndex)));
            }
            node.parentNode.replaceChild(frag, node);
        });
    }

    function resetHighlight(element) {
        const original = bulletOriginalHTML.get(element);
        if (original !== undefined) {
            element.innerHTML = original;
        }
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // 6. Navigation Active State on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
