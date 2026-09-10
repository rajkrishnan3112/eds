export default function decorate(block) {
  const heroContainer = block.closest('.hero-container');

  if (heroContainer) {
    heroContainer.classList.add('blue-background');
  }
}
