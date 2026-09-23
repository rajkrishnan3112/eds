import { decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  if (!block.classList.contains('custom-appointment')) return;

  async function fetchFields(href) {
    const { pathname, search } = new URL(href, window.location.href);
    const response = await fetch(pathname + search);
    if (!response.ok) return [];
    const { data = [] } = await response.json();
    return data;
  }

  function createField(row) {
    const label = (row.Label || '').trim();
    const name = (row.Field || '').trim().toLowerCase();
    const type = (row.Type || 'text').trim().toLowerCase();
    const required = ['true', 'yes', 'x'].includes(
      String(row.Required).trim().toLowerCase(),
    );

    const wrap = document.createElement('div');
    wrap.className = `form-field form-${type} form-${name}`;
    let field;
    if (type === 'select') {
      field = document.createElement('select');
      const placeholder = new Option(label, '', true, true);
      placeholder.disabled = true;
      field.append(placeholder);
      (row.Options || '')
        .split(',')
        .map((option) => option.trim())
        .filter(Boolean)
        .forEach((option) => {
          field.append(new Option(option, option));
        });
    } else if (type === 'textarea') {
      field = document.createElement('textarea');
      field.rows = 5;
      field.placeholder = label;
    } else {
      field = document.createElement('input');
      field.placeholder = label;
      if (type === 'date') {
        field.type = 'text';
        field.addEventListener('focus', () => {
          field.type = 'date';
        });
        field.addEventListener('blur', () => {
          if (!field.value) field.type = 'text';
        });
      } else {
        field.type = type;
      }
    }

    const fieldName = label.toLowerCase().replace(/\s+/g, '-');
    field.name = fieldName;
    field.id = `form-${fieldName}`;
    field.required = required;
    field.setAttribute('aria-label', label);
    wrap.append(field);

    return wrap;
  }

  function createSubmitButton() {
    const wrap = document.createElement('div');
    wrap.className = 'form-field form-submit';
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'BOOK NOW';
    wrap.append(button);

    return wrap;
  }

  function createPhone(phoneText) {
    const phone = document.createElement('div');
    phone.className = 'custom-appointment-phone';
    const icon = document.createElement('span');
    icon.className = 'icon icon-phone-icon';
    const number = document.createTextNode(phoneText);
    phone.append(icon, number);
    decorateIcons(phone);

    return phone;
  }

  function createImage(picture) {
    const imageWrap = document.createElement('div');
    imageWrap.className = 'custom-appointment-image';
    if (!picture) return imageWrap;
    const imageRow = picture.closest('.custom-appointment > div');
    const phoneText = imageRow
      ?.querySelector('strong')
      ?.textContent.trim();
    imageWrap.append(picture);
    if (phoneText) {
      imageWrap.append(createPhone(phoneText));
    }

    return imageWrap;
  }

  function showSuccessMessage() {
    const overlay = document.createElement('div');
    overlay.className = 'appointment-success-overlay';

    overlay.innerHTML = `
      <div class="appointment-success-modal">
        <button class="appointment-success-close" type="button" aria-label="Close">
          &times;
        </button>

        <div class="appointment-success-icon">✓</div>

        <h3>Appointment Booked!</h3>
        <p>Your appointment has been submitted successfully.</p>

        <button class="appointment-success-button" type="button">
          OK
        </button>
      </div>
    `;

    document.body.append(overlay);

    const closeModal = () => {
      overlay.remove();
    };

    overlay
      .querySelector('.appointment-success-close')
      .addEventListener('click', closeModal);

    overlay
      .querySelector('.appointment-success-button')
      .addEventListener('click', closeModal);
  }

  async function createForm(link) {
    const content = document.createElement('div');
    content.className = 'custom-appointment-content';
    const heading = document.createElement('h2');
    heading.textContent = 'Make an Appointment';
    const form = document.createElement('form');
    const fields = link ? await fetchFields(link.href) : [];
    fields.forEach((row) => {
      form.append(createField(row));
    });

    form.append(createSubmitButton());
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      // eslint-disable-next-line no-console
      console.log(data);
      showSuccessMessage();
      form.reset();
    });
    content.append(heading, form);

    return content;
  }

  const link = block.querySelector('a[href$=".json"]');
  const picture = block.querySelector('picture');
  const image = createImage(picture);
  const content = await createForm(link);
  block.replaceChildren(image, content);
}
