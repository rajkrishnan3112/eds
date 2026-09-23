export default function decorate(block) {
  if (block.classList.contains('accordion-faq')) {
    const items = [...block.children].map((row, index) => {
      const [label, body] = row.children;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'accordion-item-label';
      button.id = `accordion-label-${index}`;
      button.setAttribute('aria-controls', `accordion-body-${index}`);
      button.setAttribute('aria-expanded', 'false');

      const title = document.createElement('span');
      title.className = 'accordion-item-title';
      title.textContent = label.textContent.trim();

      button.append(title);

      const panel = document.createElement('div');
      panel.className = 'accordion-item-body';
      panel.id = `accordion-body-${index}`;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', button.id);

      const content = document.createElement('div');
      content.className = 'accordion-item-content';
      content.append(...body.childNodes);

      panel.append(content);

      const item = document.createElement('div');
      item.className = 'accordion-item';
      item.append(button, panel);

      row.replaceWith(item);

      return item;
    });

    const setOpen = (item, open) => {
      item.classList.toggle('is-open', open);

      item
        .querySelector('.accordion-item-label')
        .setAttribute('aria-expanded', String(open));
    };

    items.forEach((item) => {
      item
        .querySelector('.accordion-item-label')
        .addEventListener('click', () => {
          const willOpen = !item.classList.contains('is-open');

          items.forEach((other) => {
            setOpen(other, false);
          });

          setOpen(item, willOpen);
        });
    });

    if (items[0]) {
      setOpen(items[0], true);
    }
    // return;
  }
}
