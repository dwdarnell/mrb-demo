import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/* source FontAwesome 4 glyph classes, keyed by what the link says or where it goes */
const NETWORKS = [
  ['twitter', /twitter|(^|\.)x\.com/i],
  ['facebook', /facebook/i],
  ['instagram', /instagram/i],
  ['linkedin', /linkedin/i],
  ['envelope', /e-?mail|^mailto:/i],
];

/**
 * The FontAwesome glyph for a social link, from its text, then its href.
 * @param {HTMLAnchorElement} a the link
 * @returns {string|null} the FA name, or null
 */
function networkOf(a) {
  const hit = NETWORKS.find(([, re]) => re.test(a.textContent) || re.test(a.getAttribute('href')));
  return hit ? hit[0] : null;
}

/**
 * Footer — the source's #footer: a 6em × 2px rule, a row of FontAwesome social icons
 * (the authored link text moves into a hidden label, the glyph replaces it visually)
 * and a small copyright line.
 *
 * Content model (the /footer document): a list of social links (Twitter, Facebook, …),
 * then the copyright paragraph. Authored nodes are moved, never rebuilt (EW1); the icon
 * classes sit on generated wrappers (EW2).
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  if (block.querySelector('.footer-content')) return; // EW9: re-entrant

  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  const content = document.createElement('div');
  content.className = 'footer-content';

  if (fragment) {
    fragment.querySelectorAll('.metadata').forEach((meta) => {
      (meta.closest('.metadata-wrapper') || meta).remove();
    });
    let section = fragment.firstElementChild;
    while (section) {
      const nextSection = section.nextElementSibling;
      content.append(section);
      section = nextSection;
    }
  }

  const list = content.querySelector('ul');
  if (list) {
    const social = document.createElement('div');
    social.className = 'footer-social';
    list.before(social);
    social.append(list);
    list.querySelectorAll('li').forEach((li) => {
      const a = li.querySelector('a');
      const name = a && networkOf(a);
      if (!name) return;
      const icon = document.createElement('span');
      icon.className = `footer-icon fa-${name}`;
      a.before(icon);
      icon.append(a);
      // the authored text moves into a hidden label, like the source's span.label (EW1: moved)
      const label = document.createElement('span');
      label.className = 'label';
      while (a.firstChild) label.append(a.firstChild);
      a.append(label);
    });
  }

  block.textContent = '';
  block.append(content);
}
