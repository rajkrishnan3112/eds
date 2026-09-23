function decoratePatientReviews(block) {
  const cards = [...block.children];

  // Add card classes
  cards.forEach((card, index) => {
    card.classList.add(
      index === 0
        ? 'patient-reviews__title'
        : 'patient-reviews__card',
    );
  });

  // Title
  const title = block.querySelector('.patient-reviews__title');

  title?.querySelector('h2')?.classList.add(
    'patient-reviews__title-heading',
  );

  title?.querySelector('p')?.classList.add(
    'patient-reviews__title-description',
  );
  /* --------------------------------
    Create Carousel
  -------------------------------- */

  function createCarousel() {
    const carousel = document.createElement('div');
    carousel.classList.add('patient-reviews__carousel');

    const track = document.createElement('div');
    track.classList.add('patient-reviews__track');

    carousel.append(track);

    return {
      carousel,
      track,
    };
  }
  /* --------------------------------
   Create Navigation
  -------------------------------- */

  function createNavigation() {
    const navigation = document.createElement('div');
    navigation.classList.add('patient-reviews__navigation');

    const dots = document.createElement('div');
    dots.classList.add('patient-reviews__dots');

    navigation.append(dots);

    return {
      navigation,
      dots,
    };
  }

  /* --------------------------------
   Review Card
  -------------------------------- */

  function decorateReviewCard(card) {
    const image = card.querySelector('p:has(img)');
    const name = card.querySelector('h4');
    const designation = card.querySelector('h5');
    const description = card.querySelector('p:not(:has(img))');

    description?.classList.add(
      'patient-reviews__card-description',
    );

    image?.classList.add('patient-reviews__card-image');
    name?.classList.add('patient-reviews__card-name');

    designation?.classList.add(
      'patient-reviews__card-designation',
    );

    if (!image || !name || !designation) {
      return;
    }

    const info = document.createElement('div');
    info.classList.add('patient-reviews__card-info');

    const details = document.createElement('div');
    details.classList.add('patient-reviews__card-details');

    details.append(name, designation);
    info.append(image, details);

    card.append(info);
  }
  // Review cards
  const reviewCards = [
    ...block.querySelectorAll('.patient-reviews__card'),
  ];

  reviewCards.forEach((card) => {
    decorateReviewCard(card);
  });

  // Create carousel
  const { carousel, track } = createCarousel();

  // Create slides
  const cardsPerSlide = 2;
  const slideCount = Math.ceil(
    reviewCards.length / cardsPerSlide,
  );

  for (let index = 0; index < reviewCards.length; index += cardsPerSlide) {
    const slide = document.createElement('div');

    slide.classList.add('patient-reviews__slide');

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

  // Add carousel after title
  title?.after(carousel);

  // Navigation
  const { navigation, dots } = createNavigation();

  carousel.after(navigation);

  // Carousel state
  let currentSlide = 0;
  let autoScrollTimer;

  const moveCarousel = (slideIndex) => {
    const slides = [
      ...track.querySelectorAll('.patient-reviews__slide'),
    ];

    const slide = slides[slideIndex];

    if (!slide) {
      return;
    }

    track.style.transform = `translate3d(-${slide.offsetLeft}px, 0, 0)`;

    currentSlide = slideIndex;

    dots
      .querySelectorAll('.patient-reviews__dot')
      .forEach((dot, index) => {
        dot.classList.toggle(
          'active',
          index === currentSlide,
        );
      });
  };

  const stopAutoScroll = () => {
    window.clearInterval(autoScrollTimer);
  };

  const startAutoScroll = () => {
    if (slideCount < 2) {
      return;
    }

    stopAutoScroll();

    autoScrollTimer = window.setInterval(() => {
      const nextSlide = (currentSlide + 1) % slideCount;

      moveCarousel(nextSlide);
    }, 3000);
  };

  // Create dots
  for (let index = 0; index < slideCount; index += 1) {
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.classList.add('patient-reviews__dot');

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

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);

  // Pause on focus
  carousel.addEventListener('focusin', stopAutoScroll);
  carousel.addEventListener('focusout', startAutoScroll);

  // Start carousel
  startAutoScroll();

  // Resize
  window.addEventListener('resize', () => {
    moveCarousel(currentSlide);
  });
}
export default function decorate(block) {
  if (block.classList.contains('patient-reviews')) {
    decoratePatientReviews(block);
  }
}
