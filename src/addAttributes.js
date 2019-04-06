import each from 'lodash/each';

export default function addAttribute(el, attrs) {
  each(attrs, (value, key) => {
    el.setAttribute(key, value);
  });
  return el;
}
