const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const stickyCta = document.querySelector('[data-sticky-cta]');

const setScrolledState = () => {
  const isScrolled = window.scrollY > 24;
  header?.classList.toggle('is-scrolled', isScrolled);
  stickyCta?.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.65);
};

const closeNavigation = () => {
  document.body.classList.remove('nav-open');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'メニューを開く');
};

navToggle?.addEventListener('click', () => {
  const willOpen = !document.body.classList.contains('nav-open');
  document.body.classList.toggle('nav-open', willOpen);
  navToggle.setAttribute('aria-expanded', String(willOpen));
  navToggle.setAttribute('aria-label', willOpen ? 'メニューを閉じる' : 'メニューを開く');
});

nav?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeNavigation();
  }
});

window.addEventListener('scroll', setScrolledState, { passive: true });
setScrolledState();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
  },
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
