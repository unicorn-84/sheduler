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
    // проверяем массив строк и removeMobile для th
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
      // проверяем removeMobile для th
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

  // создаем virtTables
  const virtTables = new Array(opts.table.columns.data.length);
  for (let i = 0; i < virtTables.length; i += 1) {
    virtTables[i] = new Array(opts.table.rows.data.length);
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
      // заполняем virtTables
      virtTables[columnIndex][rowIndex] = true;
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

  // проверяем removeEmptyMobile для table
  if (opts.table.removeEmptyMobile) {
    // находим таблицы
    const tables = fragment.querySelectorAll('table');
    // проходим по virtTables
    const clone = virtTables.slice(0);
    label: // eslint-disable-line
    for (let i = 0; i < clone.length; i += 1) {
      // проходим по вложенным массивам
      for (let j = 0; j < clone[i].length; j += 1) {
        // если true, значит таблица не пустая
        if (clone[i][j] === true) {
          // выходим по метке :-\
          continue label; // eslint-disable-line
        }
      }
      // все строки пусты
      // удаляем таблицу
      tables[i].remove();
      // удаляем из virtTables
      virtTables.splice(i, 1);
    }
  }

  // проверяем removeEmptyMobile для tr в tbody
  if (opts.table.tbody.tr.removeEmptyMobile) {
    // находим таблицы
    const tables = fragment.querySelectorAll('table');
    // проходим по virtTables
    const clone = virtTables.slice(0);
    for (let i = 0; i < clone.length; i += 1) {
      // находим строки
      const tbody = tables[i].querySelector('tbody');
      const trs = tbody.querySelectorAll('tr');
      // проходим по вложенным массивам
      for (let j = 0; j < clone[i].length; j += 1) {
        // если empty, значит пустая строка
        if (!clone[i][j]) {
          // удаляем строку из таблицы
          trs[j].remove();
          // удаляем из virtTables
          // virtTables[i].splice(j, 1);
        }
      }
    }
  }

  return fragment;
}
