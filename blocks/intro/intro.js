/**
 * Collects the authored elements of every row and cell, in order, and removes the
 * then-empty row/cell divs. The nodes themselves are moved by the caller (EW1).
 * @param {Element} block the block element
 * @returns {Element[]} the authored elements
 */
function authoredNodes(block) {
  const nodes = [];
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      if (cell.children.length) nodes.push(...cell.children);
      else if (cell.textContent.trim()) {
        // a lone paragraph is unwrapped by the pipeline: keep the text node holder
        const p = document.createElement('p');
        while (cell.firstChild) p.append(cell.firstChild);
        nodes.push(p);
      }
    });
  });
  return nodes;
}

/**
 * Intro — the source's `#intro` banner panel: a white rounded panel, centred text,
 * an optional plain "event" link above a full-width image, the heading, a lead
 * paragraph and the big button.
 *
 * Decode tier: template-slotted. The prototype's composition is a template of empty
 * slots (event / media / heading / body / actions); authored nodes are MOVED into them
 * by role (EW1), classes sit on the slot wrappers only (EW2), buttons move as their
 * `<p>` (EW3). Re-entrant (EW9).
 *
 * Content model: one cell — [plain link paragraph], image, heading, paragraph(s),
 * bold-italic link (big button).
 * @param {Element} block The intro block element
 */
export default function decorate(block) {
  if (block.querySelector(':scope > .intro-content')) return; // EW9: re-entrant
  if (!block.id && !document.getElementById('intro')) block.id = 'intro';

  const nodes = authoredNodes(block);
  const content = document.createElement('div');
  content.className = 'intro-content';
  const slots = {};
  ['event', 'media', 'heading', 'body', 'actions'].forEach((name) => {
    const slot = document.createElement('div');
    slot.className = `intro-${name}`;
    slots[name] = slot;
  });

  let seenHeading = false;
  nodes.forEach((node) => {
    let role = 'body';
    const links = node.querySelectorAll('a');
    if (/^H[1-6]$/.test(node.tagName)) {
      role = 'heading';
      seenHeading = true;
    } else if (node.querySelector('picture, img')) {
      role = 'media';
    } else if (node.classList.contains('button-wrapper') || node.querySelector('a.button')) {
      role = 'actions';
    } else if (!seenHeading && node.tagName === 'P' && links.length === 1
      && links[0].textContent === node.textContent) {
      role = 'event';
    }
    slots[role].append(node);
  });

  // the source's empty <i class="fas fa-download"> before the event link text:
  // a presentational, empty inline box whose ::before draws the glyph (CSS), then a space
  slots.event.querySelectorAll('a').forEach((a) => {
    if (a.querySelector('i')) return;
    const icon = document.createElement('i');
    icon.className = 'intro-event-icon';
    icon.setAttribute('aria-hidden', 'true');
    a.prepend(icon, ' ');
  });

  Object.values(slots).forEach((slot) => {
    if (slot.children.length) content.append(slot);
  });
  block.replaceChildren(content);
}
