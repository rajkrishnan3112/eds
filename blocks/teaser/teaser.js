export default function decorate(block) {
  const items = [...block.children];
  // Custom Experts
  if (block.classList.contains('custom-experts')) {
    items.forEach((item) => {
      const [image, content] = [...item.children];

      // Content
      if (content) {
        content.classList.add('custom-experts-content');

        // // H2
        // content.querySelector('h3')?.classList.add('custom-experts-content-title');

        // // H6
        // content.querySelector('h6')?.classList.add('custom-experts-content-subtitle');

        // Paragraphs
        const paragraphs = [...content.querySelectorAll('p')];

        paragraphs.forEach((paragraph, index) => {
          const link = paragraph.querySelector('a');

          if (link) {
            paragraph.classList.add('custom-experts-content-button-wrapper');
            link.classList.add('custom-experts-content-button');
          } else if (index === 0) {
            paragraph.classList.add('custom-experts-content-subtitle'); // your new class
          } else {
            paragraph.classList.add('custom-experts-content-description');
          }
        });
      }

      // Image
      if (image) {
        image.classList.add('custom-experts-image');
        image.querySelector('picture')?.classList.add('custom-experts-image-picture');
      }
    });

    return;
  }

  // About section
  if (block.classList.contains('custom-about')) {
    const [content, image] = [...items[0].children];

    block.append(content, image);

    content.classList.add('custom-about-content');
    image.classList.add('custom-about-image');

    content.querySelector('h2')?.classList.add('custom-about-content-label');

    content.querySelector('h3')?.classList.add('custom-about-content-title');

    const paragraphs = [...content.querySelectorAll('p')];

    paragraphs[0]?.classList.add('custom-about-content-description');

    content.querySelectorAll('h4').forEach((heading) => {
      const icon = heading.previousElementSibling;
      const description = heading.nextElementSibling;

      const feature = document.createElement('div');

      feature.className = 'custom-about-content-feature';

      const featureContent = document.createElement('div');

      featureContent.className = 'custom-about-content-feature-content';

      heading.classList.add('custom-about-content-feature-content-title');

      if (description?.tagName === 'P') {
        description.classList.add('custom-about-content-feature-content-description');
        featureContent.append(heading, description);
      } else {
        featureContent.append(heading);
      }
      icon?.classList.add('custom-about-content-feature-icon-wrapper');

      icon?.querySelector('img')?.classList.add('custom-about-content-feature-icon');

      feature.append(icon, featureContent);
      content.append(feature);
    });
    const picture = image.querySelector('picture');
    picture?.classList.add('custom-about-image-picture');
    block.closest('.section')?.classList.add('about-section');
    return;
  }

  // Feature cards title
  if (items.length === 1) {
    items[0].classList.add('custom-title');
    return;
  }

  // Feature cards
  if (block.classList.contains('custom-feature-cards')) {
    items.forEach((item) => {
      item.classList.add('custom-feature-card');

      const image = item.querySelector('img');
      const title = item.querySelector('h4');
      const paragraphs = [...item.querySelectorAll('p')];

      image?.classList.add('custom-feature-card__icon');
      title?.classList.add('custom-feature-card__title');
      paragraphs.pop()?.classList.add(
        'custom-feature-card__description',
      );
    });

    // return;
  }
}
