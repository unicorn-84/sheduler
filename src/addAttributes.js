import each from 'lodash/each';

export default function addAttribute(el, attrs) {
  // проходим по объекту аттрибутов
  each(attrs, (value, key) => {
    // если ключ class и у элемента есть аттрибут class
    if (key === 'class' && el.hasAttribute('class')) {
      // дописываем значение к аттрибуту class
      el.setAttribute(key, `${el.getAttribute('class')} ${value}`);
    } else {
      // иначе создаем аттрибут
      el.setAttribute(key, value);
    }
  });
  return el;
}
