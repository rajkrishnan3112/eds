export default function decorate(block) {
  const items = [...block.children];

  /* ----- Custom Departments Cards -------*/
  if (block.classList.contains('departments-section')) {
    items.forEach((item) => {
      const card = item.querySelector(':scope > div');
      if (!card) return;

      // Card
      card.classList.add('cards-item');

      // Image
      const image = card.querySelector('picture');
      image?.closest('p')?.classList.add('cards-image');

      // Icon
      const icon = card.querySelector('.icon');
      icon?.classList.add('cards-icon');

      // Title
      const title = card.querySelector('h3');
      title?.classList.add('cards-title');

      // Description
      const paragraphs = [...card.querySelectorAll(':scope > p')];
      if (paragraphs.length > 1) {
        paragraphs[paragraphs.length - 1].classList.add('cards-description');
      }
    });
    return;
  }

  /* -----Custom Facilities Cards---------*/
  if (block.classList.contains('facilities-section')) {
    items.forEach((item) => {
      const card = item.querySelector(':scope > div');

      if (!card) return;

      // Card
      card.classList.add('cards-item');

      // Image
      const image = card.querySelector('picture');
      image?.closest('p')?.classList.add('cards-image');

      // Icon
      const icon = card.querySelector('.icon');
      icon?.classList.add('cards-icon');

      // Title
      const title = card.querySelector('h3');
      title?.classList.add('cards-title');

      // Description
      const paragraphs = [...card.querySelectorAll(':scope > p')];

      if (paragraphs.length > 1) {
        paragraphs[paragraphs.length - 1].classList.add('cards-description');
      }
    });
    // Prevent native image dragging
    block.querySelectorAll('img').forEach((img) => {
      img.setAttribute('draggable', 'false');
    });

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    block.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse') return;

      isDragging = true;
      startX = event.clientX;
      startScroll = block.scrollLeft;

      block.classList.add('is-dragging');
    });

    block.addEventListener('pointermove', (event) => {
      if (!isDragging) return;
      const distance = event.clientX - startX;
      block.scrollLeft = startScroll - distance;
    });

    const stopDragging = () => {
      if (!isDragging) return;
      isDragging = false;
      block.classList.remove('is-dragging');
    };

    block.addEventListener('pointerup', stopDragging);
    block.addEventListener('pointerleave', stopDragging);
    block.addEventListener('pointercancel', stopDragging);

    block.addEventListener('click', (event) => {
      if (isDragging) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
    // return;
  }
}
//   // Add class to the main block
//   block.classList.add('departments-card');

//   const cards = [...block.children];

//   cards.forEach((card) => {
//     const cardContent = card.querySelector(':scope > div');

//     if (!cardContent) return;

//     // Add class to card
//     cardContent.classList.add('cards-item');

//     // Image
//     const image = cardContent.querySelector('picture');
//     if (image) {
//       image.closest('p').classList.add('cards-image');
//     }

//     // Icon
//     const icon = cardContent.querySelector('.icon');
//     if (icon) {
//       icon.classList.add('cards-icon');
//     }

//     // Title
//     const title = cardContent.querySelector('h3');
//     if (title) {
//       title.classList.add('cards-title');
//     }

//     // Description
//     const paragraphs = cardContent.querySelectorAll(':scope > p');

//     if (paragraphs.length > 1) {
//       paragraphs[paragraphs.length - 1].classList.add('cards-description');
//     }
//   });
// }
