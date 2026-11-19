const HEADING = /^H[1-6]$/;

/**
 * Collects the authored elements of one row, cell by cell, in order. A cell holding only
 * text (the pipeline unwraps a lone paragraph) gets a paragraph that the text moves into.
 * @param {Element} row a block row
 * @returns {Element[]} the authored elements
 */
function rowNodes(row) {
  const nodes = [];
  [...row.children].forEach((cell) => {
    if (cell.children.length) nodes.push(...cell.children);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      while (cell.firstChild) p.append(cell.firstChild);
      nodes.push(p);
    }
  });
  return nodes;
}

/**
 * The role of an authored element inside a card, classified by content (never by index).
 * @param {Element} node an authored element
 * @returns {'media'|'heading'|'actions'|'body'} the role
 */
function roleOf(node) {
  if (HEADING.test(node.tagName)) return 'heading';
  if (node.querySelector('picture, img') || node.tagName === 'PICTURE') return 'media';
  if (node.classList.contains('button-wrapper') || node.querySelector('a.button')) return 'actions';
  return 'body';
}

/**
 * Builds one empty card template (the source's `article.item` with its image header).
 * @returns {{card: Element, header: Element, body: Element}} the card and its slots
 */
function cardTemplate() {
  const card = document.createElement('article');
  card.className = 'item';
  const header = document.createElement('div');
  header.className = 'item-header';
  const body = document.createElement('div');
  body.className = 'item-body';
  card.append(header, body);
  return { card, header, body };
}

/**
 * Items — the source's `section.items`: a two-up grid (one column at ≤ 980px) of white
 * `article.item` cards, each topped by a full-bleed image header that is a link and
 * carries the card title over a dark overlay, then a paragraph and a button.
 *
 * Decode tier: reconstructive (repeat group). Cards are segmented by content — a new card
 * starts at a heading or an image once the current card already has one — so authors
 * may add, drop or merge rows. Every authored element is MOVED (EW1): the linked image
 * paragraph and the heading into the header, everything else into the body, in order
 * (leftovers included). Classes sit on generated wrappers only (EW2); buttons move as
 * their `<p>` (EW3). Re-entrant (EW9).
 *
 * Content model: one row per card — a linked image (the header link), a heading, a
 * paragraph, a bold link (button).
 * @param {Element} block The items block element
 */
export default function decorate(block) {
  if (block.querySelector(':scope > .item')) return; // EW9: re-entrant

  const cards = [];
  let current = null;
  [...block.children].forEach((row) => {
    rowNodes(row).forEach((node) => {
      const role = roleOf(node);
      const startsCard = !current
        || (role === 'heading' && current.hasHeading)
        || (role === 'media' && (current.hasMedia || current.hasHeading));
      if (startsCard) {
        current = { ...cardTemplate(), hasHeading: false, hasMedia: false };
        cards.push(current);
      }
      if (role === 'media') {
        current.header.append(node);
        current.hasMedia = true;
      } else if (role === 'heading') {
        current.header.append(node);
        current.hasHeading = true;
      } else {
        current.body.append(node);
      }
    });
    // a new row always starts a new card
    current = null;
  });

  block.replaceChildren(...cards.map(({ card }) => card));
}
