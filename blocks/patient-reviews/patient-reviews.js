export default function decorate(block) {
  const cards = [...block.children];
  const classNames = [
    'patient-reviews__title',
    'patient-reviews__card',
    'patient-reviews__card',
    'patient-reviews__card',
    'patient-reviews__card',
    'patient-reviews__card',
    'patient-reviews__card',
  ];

  cards.forEach((card, index) => {
    card.classList.add(classNames[index]);
  });
  // Title section
  const title = block.querySelector('.patient-reviews__title');
  title?.querySelector('h2')?.classList.add('patient-reviews__title-heading');
  title?.querySelector('p')?.classList.add('patient-reviews__title-description');
  // Review cards
  const reviewCards = block.querySelectorAll('.patient-reviews__card');
  reviewCards.forEach((card) => {
    const image = card.querySelector('p:has(img)');
    const name = card.querySelector('h4');
    const designation = card.querySelector('h5');
    card.querySelector('p:not(:has(img))')?.classList.add('patient-reviews__card-description');
    image?.classList.add('patient-reviews__card-image');
    name?.classList.add('patient-reviews__card-name');
    designation?.classList.add('patient-reviews__card-designation');
    if (image && name && designation) {
      const info = document.createElement('div');
      info.classList.add('patient-reviews__card-info');

      const details = document.createElement('div');
      details.classList.add('patient-reviews__card-details');

      details.append(name, designation);

      info.append(image, details);

      card.append(info);
    }
  });
  // -----------------------------
  // Create carousel
  // -----------------------------

  const carousel = document.createElement('div');

  carousel.classList.add(
    'patient-reviews__carousel',
  );

  const track = document.createElement('div');

  track.classList.add(
    'patient-reviews__track',
  );

  carousel.append(track);

  // -----------------------------
  // Create slides
  // 2 cards per slide
  // -----------------------------

  const cardsPerSlide = 2;

  const slideCount = Math.ceil(
    reviewCards.length / cardsPerSlide,
  );

  for (
    let index = 0;
    index < reviewCards.length;
    index += cardsPerSlide
  ) {
    const slide = document.createElement('div');

    slide.classList.add(
      'patient-reviews__slide',
    );

    const firstCard = reviewCards[index];

    const secondCard = reviewCards[index + 1];

    if (firstCard) {
      slide.append(firstCard);
    }

    if (secondCard) {
      slide.append(secondCard);
    }

    track.append(slide);
  }

  // -----------------------------
  // Put carousel after title
  // -----------------------------

  title?.after(carousel);

  // -----------------------------
  // Create navigation
  // -----------------------------

  const navigation = document.createElement('div');

  navigation.classList.add(
    'patient-reviews__navigation',
  );

  const dots = document.createElement('div');

  dots.classList.add(
    'patient-reviews__dots',
  );

  navigation.append(dots);

  carousel.after(navigation);

  // -----------------------------
  // Carousel state
  // -----------------------------

  let currentSlide = 0;

  // -----------------------------
  // Move carousel
  // -----------------------------

  const moveCarousel = (slideIndex) => {
    const slides = [
      ...track.querySelectorAll(
        '.patient-reviews__slide',
      ),
    ];

    if (!slides.length) {
      return;
    }

    const slide = slides[slideIndex];

    if (!slide) {
      return;
    }

    track.style.transform = `translate3d(-${slide.offsetLeft}px, 0, 0)`;

    currentSlide = slideIndex;

    dots
      .querySelectorAll(
        '.patient-reviews__dot',
      )
      .forEach((dot, index) => {
        dot.classList.toggle(
          'active',
          index === currentSlide,
        );
      });
  };

  // -----------------------------
  // Auto scroll
  // -----------------------------

  let autoScrollTimer;

  const startAutoScroll = () => {
    if (slideCount < 2) {
      return;
    }

    window.clearInterval(autoScrollTimer);

    autoScrollTimer = window.setInterval(() => {
      const nextSlide = (currentSlide + 1) % slideCount;

      moveCarousel(nextSlide);
    }, 5000);
  };

  const stopAutoScroll = () => {
    window.clearInterval(autoScrollTimer);
  };

  // -----------------------------
  // Create dots
  // -----------------------------

  for (
    let index = 0;
    index < slideCount;
    index += 1
  ) {
    const dot = document.createElement('button');

    dot.type = 'button';

    dot.classList.add(
      'patient-reviews__dot',
    );

    dot.setAttribute(
      'aria-label',
      `Go to review slide ${index + 1}`,
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

  // -----------------------------
  // Pause on hover
  // -----------------------------

  carousel.addEventListener(
    'mouseenter',
    stopAutoScroll,
  );

  carousel.addEventListener(
    'mouseleave',
    startAutoScroll,
  );

  carousel.addEventListener(
    'focusin',
    stopAutoScroll,
  );

  carousel.addEventListener(
    'focusout',
    startAutoScroll,
  );

  // Start carousel
  startAutoScroll();

  // -----------------------------
  // Resize
  // -----------------------------

  window.addEventListener(
    'resize',
    () => {
      moveCarousel(currentSlide);
    },
  );
}
