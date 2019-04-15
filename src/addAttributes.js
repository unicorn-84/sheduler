import each from 'lodash/each';

function addAttribute(el, attrs, parents) {
  if (el) {
    // проходим по объекту аттрибутов
    each(attrs, (value, key) => {
      // проверяем значение
      if (value !== null) {
        // если ключ class и у элемента есть аттрибут class
        if (key === 'class' && el.hasAttribute('class')) {
          // дописываем значение к аттрибуту class
          el.setAttribute(key, `${el.getAttribute('class')} ${value}`);
        } else {
          // иначе создаем аттрибут
          el.setAttribute(key, value);
        }
      }
    });
    // проверяем parents
    if (parents instanceof Array) {
      each(parents, (item) => {
        const parent = el.closest(item.selector);
        if (parent && item.attributes) {
          addAttribute(parent, item.attributes);
        }
      });
    }
    return el;
  }
}

export default addAttribute;
