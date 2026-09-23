// export default function decorate(block) {
//   const heroContainer = block.closest('.hero-container');

//   if (heroContainer) {
//     heroContainer.classList.add('blue-background');
//   }
// }

export default function decorate(block) {
  const slides = [...block.children];

  // --------------------------------
  // Add main hero class
  // --------------------------------

  block.classList.add('custom-hero');

  // --------------------------------
  // Add classes to each slide
  // --------------------------------

  slides.forEach((slide) => {
    slide.classList.add('custom-hero__slide');

    const content = slide.children[0];
    const imageWrapper = slide.children[1];

    if (content) {
      content.classList.add('custom-hero__content');

      const title = content.querySelector('h1');

      if (title) {
        title.classList.add('custom-hero__title');
      }

      const paragraphs = content.querySelectorAll('p');

      paragraphs.forEach((paragraph) => {
        if (paragraph.querySelector('a')) {
          paragraph.classList.add('custom-hero__button-wrapper');

          const button = paragraph.querySelector('a');

          button.classList.add('custom-hero__button');
        } else {
          paragraph.classList.add('custom-hero__description');
        }
      });
    }

    // --------------------------------
    // Image
    // --------------------------------

    if (imageWrapper) {
      imageWrapper.classList.add('custom-hero__image-wrapper');

      const picture = imageWrapper.querySelector('picture');

      if (picture) {
        picture.classList.add('custom-hero__picture');
      }

      const image = imageWrapper.querySelector('img');

      if (image) {
        image.classList.add('custom-hero__image');
      }
    }
  });

  // --------------------------------
  // Only one slide
  // --------------------------------

  if (slides.length <= 1) {
    return;
  }

  // --------------------------------
  // Create carousel
  // --------------------------------

  const carousel = document.createElement('div');

  carousel.classList.add('custom-hero__carousel');

  // --------------------------------
  // Create track
  // --------------------------------

  const track = document.createElement('div');

  track.classList.add('custom-hero__track');

  // --------------------------------
  // Add slides to track
  // --------------------------------

  slides.forEach((slide) => {
    track.append(slide);
  });

  carousel.append(track);

  // --------------------------------
  // Create navigation
  // --------------------------------

  const navigation = document.createElement('div');

  navigation.classList.add('custom-hero__navigation');

  const dots = document.createElement('div');

  dots.classList.add('custom-hero__dots');

  navigation.append(dots);

  carousel.append(navigation);

  // --------------------------------
  // Add carousel to block
  // --------------------------------

  block.append(carousel);

  // --------------------------------
  // Carousel state
  // --------------------------------

  let currentSlide = 0;

  const slideCount = slides.length;

  // --------------------------------
  // Move carousel
  // --------------------------------

  const moveCarousel = (slideIndex) => {
    const slide = slides[slideIndex];

    if (!slide) {
      return;
    }

    track.style.transform = `translate3d(-${slide.offsetLeft}px, 0, 0)`;

    currentSlide = slideIndex;

    dots
      .querySelectorAll('.custom-hero__dot')
      .forEach((dot, index) => {
        dot.classList.toggle(
          'active',
          index === currentSlide,
        );
      });
  };

  // --------------------------------
  // Auto scroll
  // --------------------------------

  let autoScrollTimer;

  const startAutoScroll = () => {
    if (slideCount < 2) {
      return;
    }

    window.clearInterval(autoScrollTimer);

    autoScrollTimer = window.setInterval(() => {
      const nextSlide = (currentSlide + 1) % slideCount;

      moveCarousel(nextSlide);
    }, 3000);
  };

  const stopAutoScroll = () => {
    window.clearInterval(autoScrollTimer);
  };

  // --------------------------------
  // Create dots
  // --------------------------------

  for (let index = 0; index < slideCount; index += 1) {
    const dot = document.createElement('button');

    dot.type = 'button';

    dot.classList.add('custom-hero__dot');

    dot.setAttribute(
      'aria-label',
      `Go to hero slide ${index + 1}`,
    );

    if (index === 0) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      moveCarousel(index);
      startAutoScroll();
    });

    dots.append(dot);
  }

  // --------------------------------
  // Pause on hover
  // --------------------------------

  carousel.addEventListener(
    'mouseenter',
    stopAutoScroll,
  );

  carousel.addEventListener(
    'mouseleave',
    startAutoScroll,
  );

  // --------------------------------
  // Pause on focus
  // --------------------------------

  carousel.addEventListener(
    'focusin',
    stopAutoScroll,
  );

  carousel.addEventListener(
    'focusout',
    startAutoScroll,
  );

  // --------------------------------
  // Start carousel
  // --------------------------------

  startAutoScroll();

  // --------------------------------
  // Resize
  // --------------------------------

  window.addEventListener('resize', () => {
    moveCarousel(currentSlide);
  });
}
