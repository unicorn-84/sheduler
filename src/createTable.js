import addAttributes from './addAttributes';

export default function createTable(opts) {
  // создаем элемент table
  const table = document.createElement('table');
  // проверяем пользовательские аттрибуты
  if (opts.table.attributes) {
    addAttributes(table, opts.table.attributes);
  }

  // THEAD
  // проверяем массив колонок и thead.disable
  if (opts.table.thead.disable !== true && opts.table.columns.data.length > 0) {
    // создаем элемент thead
    const thead = table.createTHead();
    // проверяем пользовательские аттрибуты
    if (opts.table.thead.attributes) {
      addAttributes(thead, opts.table.thead.attributes);
    }
    // создаем элемент tr
    const tr = thead.insertRow(-1);
    // проверяем пользовательские аттрибуты
    if (opts.table.thead.tr.attributes) {
      addAttributes(tr, opts.table.thead.tr.attributes);
    }
    // проверяем массив строк и remove
    if (opts.table.rows.data.length > 0 && !opts.table.tbody.td.remove) {
      // создаем элемент td
      const td = tr.insertCell(-1);
      // проверяем пользовательские аттрибуты
      if (opts.table.thead.td.attributes) {
        addAttributes(td, opts.table.thead.td.attributes);
      }
    }
    // проходим по массиву колонок
    for (let i = 0; i < opts.table.columns.data.length; i += 1) {
      // создаем элемент td
      const td = tr.insertCell(-1);
      // проверяем пользовательские аттрибуты
      if (opts.table.thead.td.attributes) {
        addAttributes(td, opts.table.thead.td.attributes);
      }
      // присваиваем значение из массива колонок элементу td
      td.textContent = opts.table.columns.data[i];
    }
  }

  // TBODY
  // проверяем массив строк
  if (opts.table.rows.data.length > 0) {
    // создаем элемент tbody
    const tbody = table.createTBody();
    // проверяем пользовательские аттрибуты
    if (opts.table.tbody.attributes) {
      addAttributes(tbody, opts.table.tbody.attributes);
    }
    // проходим по массиву строк
    for (let i = 0; i < opts.table.rows.data.length; i += 1) {
      // создаем элемент tr
      const tr = tbody.insertRow(-1);
      // проверяем пользовательские аттрибуты
      if (opts.table.tbody.tr.attributes) {
        addAttributes(tr, opts.table.tbody.tr.attributes);
      }
      // проверяем remove
      if (!opts.table.tbody.td.remove) {
        // создаем элемент td
        const td = tr.insertCell(-1);
        // проверяем пользовательские аттрибуты
        if (opts.table.tbody.td.attributes) {
          addAttributes(td, opts.table.tbody.td.attributes);
        }
        // присваиваем значение из массива строк элементу td
        td.textContent = opts.table.rows.data[i];
      }
      // проходим по массиву колонок
      for (let j = 0; j < opts.table.columns.data.length; j += 1) {
        // создаем элемент td
        const td = tr.insertCell(-1);
        // проверяем пользовательские аттрибуты
        if (opts.table.tbody.td.attributes) {
          addAttributes(td, opts.table.tbody.td.attributes);
        }
        // проверяем content
        if (opts.table.tbody.td.content) {
          // присваиваем значение заполнителя из опций элементу td
          td.innerHTML = opts.table.tbody.td.content;
        }
      }
    }
  }

  // создаем empty массив
  const virtTable = new Array(opts.table.rows.data.length);

  // EVENTS
  // проходим по массиву событий
  for (let i = 0; i < opts.events.length; i += 1) {
    // проверяем наличие значений объекта события в массивах колонок и строк
    const rowIndex = opts.table.rows.data.indexOf(opts.events[i].row);
    const columnIndex = opts.table.columns.data.indexOf(opts.events[i].column);
    if (rowIndex !== -1 && columnIndex !== -1) {
      const tbody = table.querySelector('tbody');
      if (tbody) {
        // находим строку
        const tr = tbody.querySelectorAll('tr')[rowIndex];
        if (tr) {
          // изменяем virtTables
          virtTable[rowIndex] = true;
          // находим ячейку
          const td = tr.querySelectorAll('td')[columnIndex + 1];
          if (td) {
            // проверяем пользовательские аттрибуты
            if (opts.events[i].attributes) {
              addAttributes(td, opts.events[i].attributes);
            }
            // присваиваем значение события td
            td.innerHTML = opts.events[i].content;
          }
        }
      }
    }
  }

  // проверяем table.disableEmpty
  if (opts.table.disableEmpty === true) {
    if (!virtTable.includes(true)) {
      // все строки пусты не создаем таблицу
      return null;
    }
  }

  // проверяем tbody.disableEmptyRow
  if (opts.table.tbody.disableEmptyRows) {
    const tbody = table.querySelector('tbody');
    if (tbody) {
      const trs = tbody.querySelectorAll('tr');
      if (trs.length > 0) {
        // проходим по virtTable
        for (let i = 0; i < virtTable.length; i += 1) {
          // если не true, значит пустая строка
          if (virtTable[i] !== true) {
            // находим и удаляем строку
            if (trs[i]) {
              trs[i].remove();
            }
          }
        }
      }
    }
  }

  return table;
}
