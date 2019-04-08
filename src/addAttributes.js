import each from 'lodash/each';

export default function addAttribute(el, attrs) {
  each(attrs, (value, key) => {
    if (key === 'class' && el.hasAttribute('class')) {
      el.setAttribute(key, `${el.getAttribute('class')} ${value}`);
    } else {
      el.setAttribute(key, value);
    }
  });
  return el;
}
