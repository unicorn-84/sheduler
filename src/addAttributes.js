import each from 'lodash/each';
import uniq from 'lodash/uniq';

function addAttribute(el, attrs, parents) {
  if (el) {
    if (attrs) {
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
    }
    // проверяем parents
    if (parents && parents instanceof Array) {
      each(parents, (item) => {
        const parent = el.closest(item.selector);
        if (parent && item.attributes) {
          addAttribute(parent, item.attributes);
        }
      });
    }

    // удалим повторы
    if (el.hasAttribute('class')) {
      el.setAttribute('class', uniq(el.getAttribute('class').split(' ')).join(' '));
    }
  }

  return el;
}

export default addAttribute;
