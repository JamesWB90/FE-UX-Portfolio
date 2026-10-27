const header = document.querySelector('#header');
const menuBtn = document.querySelector('#menu-btn');
const navLinks = document.querySelector('#nav-links');
const themeToggle = document.querySelector('#theme-toggle');

// Header background once the page has scrolled
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
if (menuBtn && navLinks) {
    const setMenu = (open) => {
        navLinks.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', open);
        menuBtn.querySelector('i').className = open ? 'bx bx-x' : 'bx bx-menu';
    };
    menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
    navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
}

// Light / dark theme (dark by default, choice remembered)
const updateThemeIcon = () => {
    const light = document.documentElement.dataset.theme === 'light';
    themeToggle.querySelector('i').className = light ? 'bx bx-moon' : 'bx bx-sun';
};
if (themeToggle) {
    updateThemeIcon();
    themeToggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
        updateThemeIcon();
    });
}

// Reveal sections as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add('visible'));
}

// Contact form: send people back to this site's thank-you page after FormSubmit
const formNext = document.querySelector('#form-next');
if (formNext) formNext.value = new URL('thankyou.html', window.location.href).href;

// Footer year
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
