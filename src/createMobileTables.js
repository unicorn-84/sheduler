import addAttributes from './addAttributes';

export default function createMobileTables(opts) {
  // создаем DocumentFragment
  const fragment = document.createDocumentFragment();
  // проходим по массиву колонок
  for (let i = 0; i < opts.table.columns.data.length; i += 1) {
    // создаем элемент table
    let table = document.createElement('table');
    // проверяем пользовательские аттрибуты
    if (opts.table.attributes) {
      if (opts.table.attributes.id) {
        const opt = Object.assign({}, opts.table.attributes);
        opt.id = null;
        table = addAttributes(table, opt);
      } else {
        table = addAttributes(table, opts.table.attributes);
      }
    }
    // проверяем indexing
    if (opts.indexing) {
      // задаем индекс
      table.setAttribute('data-index', String(i));
    }
    // THEAD
    // создаем элемент thead
    let thead = document.createElement('thead');
    // проверяем пользовательские аттрибуты
    if (opts.table.thead.attributes) {
      thead = addAttributes(thead, opts.table.thead.attributes);
    }
    // создаем элемент tr
    let tr = document.createElement('tr');
    // проверяем пользовательские аттрибуты
    if (opts.table.thead.tr.attributes) {
      tr = addAttributes(tr, opts.table.thead.tr.attributes);
    }
    let th;
    // проверяем массив строк и display
    if (opts.table.rows.data.length > 0 && !opts.table.tbody.th.removeMobile) {
      // создаем элемент th
      th = document.createElement('th');
      // проверяем пользовательские аттрибуты
      if (opts.table.thead.th.attributes) {
        th = addAttributes(th, opts.table.thead.th.attributes);
      }
      // добавляем элемент th в tr
      tr.appendChild(th);
    }
    // создаем элемент th
    th = document.createElement('th');
    // проверяем пользовательские аттрибуты
    if (opts.table.thead.th.attributes) {
      th = addAttributes(th, opts.table.thead.th.attributes);
    }
    // присваиваем значение из массива колонок элементу th
    th.textContent = opts.table.columns.data[i];
    // добавляем элемент th в tr
    tr.appendChild(th);
    // добавляем элемент tr в thead
    thead.appendChild(tr);
    // добавляем элемент thead в table
    table.appendChild(thead);
    // TBODY
    // создаем элемент tbody
    let tbody = document.createElement('tbody');
    // проверяем пользовательские аттрибуты
    if (opts.table.tbody.attributes) {
      tbody = addAttributes(tbody, opts.table.tbody.attributes);
    }
    // проходим по массиву строк
    for (let k = 0; k < opts.table.rows.data.length; k += 1) {
      // создаем элемент tr
      tr = document.createElement('tr');
      // проверяем пользовательские аттрибуты
      if (opts.table.tbody.tr.attributes) {
        tr = addAttributes(tr, opts.table.tbody.tr.attributes);
      }
      // проверяем display
      if (!opts.table.tbody.th.removeMobile) {
        // создаем элемент th
        th = document.createElement('th');
        // проверяем пользовательские аттрибуты
        if (opts.table.tbody.th.attributes) {
          th = addAttributes(th, opts.table.tbody.th.attributes);
        }
        // присваиваем значение из массива строк элементу th
        th.innerHTML = opts.table.rows.data[k];
        // добавляем элемент th в tr
        tr.appendChild(th);
      }
      // создаем элемент td
      let td = document.createElement('td');
      // проверяем пользовательские аттрибуты
      if (opts.table.tbody.td.attributes) {
        td = addAttributes(td, opts.table.tbody.td.attributes);
      }
      // проверяем content
      if (opts.table.tbody.td.content) {
        // присваиваем значение заполнителя из опций элементу td
        td.innerHTML = opts.table.tbody.td.content;
      }
      // добавляем элемент td в tr
      tr.appendChild(td);
      // добавляем элемент tr в tbody
      tbody.appendChild(tr);
    }
    // добавляем элемент tbody в table
    table.appendChild(tbody);
    // добавляем элемент table в DocumentFragment
    fragment.appendChild(table);
  }
  // EVENTS
  // todo: Добавить проверку на совпадение
  // проходим по массиву событий
  for (let i = 0; i < opts.events.length; i += 1) {
    // проверяем наличие значений объекта события в массивах колонок и строк
    const rowIndex = opts.table.rows.data.indexOf(opts.events[i].row);
    const columnIndex = opts.table.columns.data.indexOf(opts.events[i].column);
    if (rowIndex !== -1 && columnIndex !== -1) {
      // находим таблицу с совпавшим значением колонки
      const table = fragment.querySelectorAll('table')[columnIndex];
      // находим в таблице tbody
      const tbody = table.querySelector('tbody');
      // находим в tbody tr с совпавшим значением строки
      const tr = tbody.querySelectorAll('tr')[rowIndex];
      // находим td в tr
      let td = tr.querySelector('td');
      // проверяем пользовательские аттрибуты у события
      if (opts.events[i].attributes) {
        td = addAttributes(td, opts.events[i].attributes);
      }
      // присваиваем значение события td
      td.innerHTML = opts.events[i].content;
    }
  }
  return fragment;
}
