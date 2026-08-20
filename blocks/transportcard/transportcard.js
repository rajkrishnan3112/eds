export default function decorate(block) {
  const cards = [...block.children];

  cards.forEach((card) => {
    card.classList.add('custom-transportcard');
    console.log(card);

    const number = card.querySelector('h1');
    number?.classList.add('custom-transportcard__number');

    const title = card.querySelector('h4');
    title?.classList.add('custom-transportcard__title');

    const image = card.querySelector('p:has(img)');
    image?.classList.add('custom-transportcard__image');

    const description = card.querySelector('p:not(:has(img))');
    description?.classList.add('custom-transportcard__description');
  });
}