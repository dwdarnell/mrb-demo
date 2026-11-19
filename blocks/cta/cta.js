/**
 * Collects the authored elements of every row and cell, in order. The nodes are moved
 * by the caller (EW1).
 * @param {Element} block the block element
 * @returns {Element[]} the authored elements
 */
function authoredNodes(block) {
  const nodes = [];
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      if (cell.children.length) nodes.push(...cell.children);
      else if (cell.textContent.trim()) {
        const p = document.createElement('p');
        while (cell.firstChild) p.append(cell.firstChild);
        nodes.push(p);
      }
    });
  });
  return nodes;
}

/**
 * CTA — the source's `#cta.main.special` band: centred heading, a paragraph whose line
 * breaks are authored (`<br>`, hidden at ≤ 480px like the source) and the big button.
 *
 * Decode tier: template-slotted (heading / body / actions slots); authored nodes are
 * MOVED into them by role (EW1), classes on the slot wrappers only (EW2), the button
 * moves as its `<p>` (EW3). Re-entrant (EW9).
 *
 * Content model: one cell — heading, paragraph(s), bold-italic link (big button).
 * @param {Element} block The cta block element
 */
export default function decorate(block) {
  if (block.querySelector(':scope > .cta-content')) return; // EW9: re-entrant
  if (!block.id && !document.getElementById('cta')) block.id = 'cta';

  const nodes = authoredNodes(block);
  const content = document.createElement('div');
  content.className = 'cta-content';
  const slots = {};
  ['heading', 'body', 'actions'].forEach((name) => {
    const slot = document.createElement('div');
    slot.className = `cta-${name}`;
    slots[name] = slot;
  });

  nodes.forEach((node) => {
    let role = 'body';
    if (/^H[1-6]$/.test(node.tagName)) role = 'heading';
    else if (node.classList.contains('button-wrapper') || node.querySelector('a.button')) {
      role = 'actions';
    }
    slots[role].append(node);
  });

  Object.values(slots).forEach((slot) => {
    if (slot.children.length) content.append(slot);
  });
  block.replaceChildren(content);
}
