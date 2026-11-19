import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Normalises a path for active-link matching: drops `.html`, a trailing slash and
 * `/index`, so `/bikes.html`, `/bikes/` and `/bikes` all read `/bikes`.
 * @param {string} path a pathname
 * @returns {string} the normalised path
 */
function normalisePath(path) {
  let p = path.replace(/\.html?$/i, '').replace(/\/index$/i, '/');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p.toLowerCase() || '/';
}

/**
 * Header — the source's grey top nav (`div#myTopnav.topnav`): floated links, the
 * current page's link red, a ☰ link shown only at ≤ 600px. The source's ☰ handler
 * is undefined on the live site, so it is inert here too (no menu, no dropdown).
 *
 * Content model (the /nav document): one list (or paragraphs) of links, in order.
 * Authored nodes are moved into the nav, never rebuilt (EW1); the ☰ control is
 * presentational chrome generated here.
 * @ew-exempt the ☰ control is presentational (source: dead `javascript:void(0)` link)
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  if (block.querySelector('nav.topnav')) return; // EW9: re-entrant

  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  const nav = document.createElement('nav');
  nav.id = 'myTopnav';
  nav.className = 'topnav';
  nav.setAttribute('aria-label', 'Main');

  if (fragment) {
    fragment.querySelectorAll(':scope > .section').forEach((section) => {
      section.querySelectorAll('.metadata').forEach((meta) => {
        (meta.closest('.metadata-wrapper') || meta).remove();
      });
      const content = section.querySelector('.default-content-wrapper') || section;
      let node = content.firstElementChild;
      while (node) {
        const next = node.nextElementSibling;
        nav.append(node);
        node = next;
      }
    });
  }

  const here = normalisePath(window.location.pathname);
  nav.querySelectorAll('a[href]').forEach((a) => {
    const url = new URL(a.href, window.location);
    if (url.origin === window.location.origin && normalisePath(url.pathname) === here) {
      a.setAttribute('aria-current', 'page');
    }
  });

  const toggle = document.createElement('a');
  toggle.href = '#';
  toggle.className = 'topnav-icon';
  toggle.textContent = '☰';
  toggle.addEventListener('click', (e) => e.preventDefault());
  nav.append(toggle);

  block.textContent = '';
  block.append(nav);
}
