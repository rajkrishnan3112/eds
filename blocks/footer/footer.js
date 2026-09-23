// import { getMetadata } from '../../scripts/aem.js';
// import { loadFragment } from '../fragment/fragment.js';

// /**
//  * loads and decorates the footer
//  * @param {Element} block The footer block element
//  */
// export default async function decorate(block) {
//   // load footer as fragment
//   const footerMeta = getMetadata('footer');
//   const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
//   const fragment = await loadFragment(footerPath);

//   // decorate footer DOM
//   block.textContent = '';
//   const footer = document.createElement('div');
//   while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

//   block.append(footer);
// }
export default async function decorate(block) {
  const items = [...block.children];

  // ---------- Newsletter heading ----------
  items[0]?.classList.add('custom-footer__newsletter');

  // ---------- Subscribe form ----------
  // ---------- Subscribe form ----------
  const mailRow = items[1];

  if (mailRow) {
    mailRow.classList.add('custom-footer__mail');

    const cells = [...mailRow.children];
    const buttonText = cells[1]?.querySelector('a')?.textContent.trim() || 'Subscribe';

    // Get form data
    const response = await fetch('/form-data.json');
    const formData = await response.json();

    // Find email field
    const emailField = formData.data.find((field) => field.Field === 'email');

    const emailLabel = emailField?.Label || 'Email';
    const emailType = emailField?.Type || 'email';
    const isRequired = emailField?.Required === 'true';

    mailRow.innerHTML = '';

    const form = document.createElement('form');
    form.className = 'custom-footer__newsletter-form';
    form.noValidate = true;

    form.innerHTML = `
      <div class="custom-footer__input-wrap">
        <input
          type="${emailType}"
          name="${emailField?.Field || 'email'}"
          placeholder="${emailLabel}"
          aria-label="${emailLabel}"
          ${isRequired ? 'required' : ''}
        />
        <button type="submit">${buttonText}</button>
      </div>
      <p class="custom-footer__form-error" aria-live="polite"></p>
    `;

    mailRow.appendChild(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const input = form.querySelector('input');
      const error = form.querySelector('.custom-footer__form-error');

      if (!input.value.trim()) {
        error.textContent = `${emailLabel} is required`;
      } else if (!input.checkValidity()) {
        error.textContent = `Please enter a valid ${emailLabel.toLowerCase()}`;
      } else {
        error.textContent = '';
        // eslint-disable-next-line no-console
        console.log('Email:', input.value);
        form.reset();
      }
    });
  }

  // ---------- About column ----------
  const about = items[2];
  about?.classList.add('custom-footer__about');

  const logoPara = about?.querySelector('picture')?.closest('p');
  if (logoPara) {
    const picture = logoPara.querySelector('picture');
    const logoWrap = document.createElement('div');
    logoWrap.className = 'custom-footer__logo';
    logoWrap.appendChild(picture);
    // logoPara.classList.add('custom-footer-description');
    logoPara.before(logoWrap);
  }

  const socialItems = about?.querySelectorAll('.icon');
  if (socialItems?.length) {
    const socialWrap = document.createElement('div');
    socialWrap.className = 'custom-footer__social';
    const firstIconPara = socialItems[0].closest('p');
    firstIconPara?.before(socialWrap);
    socialItems.forEach((icon) => {
      const para = icon.closest('p');
      para?.classList.add('custom-footer__social-item');
      if (para) socialWrap.appendChild(para);
    });
  }

  // ---------- Quick Links ----------
  items[3]?.classList.add('custom-footer__quick-links');

  // ---------- Useful Links ----------
  items[4]?.classList.add('custom-footer__useful-links');

  // ---------- Quick Contact ----------
  const contact = items[5];
  contact?.classList.add('custom-footer__contact');

  const contactList = contact?.querySelector('ul');
  const contactItems = contactList ? [...contactList.querySelectorAll(':scope > li')] : [];
  const contactIcons = contact ? [...contact.querySelectorAll('.icon')] : [];
  contactIcons.forEach((icon, i) => {
    const li = contactItems[i];
    const iconPara = icon.closest('p');
    if (li && iconPara) {
      li.prepend(iconPara);
    }
  });

  // ---------- Copyright ----------
  items[6]?.classList.add('custom-footer__copyright');
}
