import addAttributes from './addAttributes';

export default function createTable(opts) {
  // создаем элемент table
  let table = document.createElement('table');
  // проверяем пользовательские аттрибуты
  if (opts.table.attributes) {
    table = addAttributes(table, opts.table.attributes);
  }
  // THEAD
  // проверяем массив колонок
  if (opts.table.columns.data.length > 0) {
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
    // проверяем массив строк
    if (opts.table.rows.data.length > 0) {
      // создаем элемент th
      th = document.createElement('th');
      // проверяем пользовательские аттрибуты
      if (opts.table.thead.th.attributes) {
        th = addAttributes(th, opts.table.thead.th.attributes);
      }
      // добавляем элемент th в tr
      tr.appendChild(th);
    }
    // проходим по массиву колонок
    for (let i = 0; i < opts.table.columns.data.length; i += 1) {
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
    }
    // добавляем элемент tr в thead
    thead.appendChild(tr);
    // добавляем элемент thead в table
    table.appendChild(thead);
  }
  // TBODY
  // проверяем массив строк
  if (opts.table.rows.data.length > 0) {
    // создаем элемент tbody
    let tbody = document.createElement('tbody');
    // проверяем пользовательские аттрибуты
    if (opts.table.tbody.attributes) {
      tbody = addAttributes(tbody, opts.table.tbody.attributes);
    }
    // проходим по массиву строк
    for (let i = 0; i < opts.table.rows.data.length; i += 1) {
      // создаем элемент tr
      let tr = document.createElement('tr');
      // проверяем пользовательские аттрибуты
      if (opts.table.tbody.tr.attributes) {
        tr = addAttributes(tr, opts.table.tbody.tr.attributes);
      }
      // создаем элемент th
      let th = document.createElement('th');
      // проверяем пользовательские аттрибуты
      if (opts.table.tbody.th.attributes) {
        th = addAttributes(th, opts.table.tbody.th.attributes);
      }
      // присваиваем значение из массива строк элементу th
      th.textContent = opts.table.rows.data[i];
      // добавляем элемент th в tr
      tr.appendChild(th);
      // проходим по массиву колонок
      for (let j = 0; j < opts.table.columns.data.length; j += 1) {
        // создаем элемент td
        let td = document.createElement('td');
        // проверяем пользовательские аттрибуты
        if (opts.table.tbody.td.attributes) {
          td = addAttributes(td, opts.table.tbody.td.attributes);
        }
        // присваиваем значение заполнителя из опций элементу td
        td.innerHTML = opts.table.tbody.td.content;
        // добавляем элемент td в tr
        tr.appendChild(td);
      }
      // добавляем элемент tr в tbody
      tbody.appendChild(tr);
    }
    // EVENTS
    // todo: Добавить проверку на совпадение
    // проходим по массиву событий
    for (let i = 0; i < opts.events.length; i += 1) {
      // проверяем наличие значений объекта события в массивах колонок и строк
      const rowIndex = opts.table.rows.data.indexOf(opts.events[i].row);
      const columnIndex = opts.table.columns.data.indexOf(opts.events[i].column);
      if (rowIndex !== -1 && columnIndex !== -1) {
        // находим строку
        const tr = tbody.querySelectorAll('tr')[rowIndex];
        // находим колонку
        let td = tr.querySelectorAll('td')[columnIndex];
        // проверяем пользовательские аттрибуты
        if (opts.events[i].attributes) {
          td = addAttributes(td, opts.events[i].attributes);
        }
        // присваиваем значение события td
        td.innerHTML = opts.events[i].content;
      }
    }
    // добавляем элемент tbody в table
    table.appendChild(tbody);
  }
  return table;
}
