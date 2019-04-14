import addAttributes from './addAttributes';

export default function createMobileTables(opts) {
  // создаем DocumentFragment
  const fragment = document.createDocumentFragment();

  // проходим по массиву колонок
  for (let i = 0; i < opts.table.columns.data.length; i += 1) {
    // создаем элемент table
    const table = document.createElement('table');
    // проверяем пользовательские аттрибуты
    if (opts.table.attributes) {
      if (opts.table.attributes.id) {
        const opt = Object.assign({}, opts.table.attributes);
        opt.id = null;
        addAttributes(table, opt);
      } else {
        addAttributes(table, opts.table.attributes);
      }
    }
    // проверяем indexing
    if (opts.indexing) {
      // задаем индекс
      table.setAttribute('data-index', String(i));
    }

    // THEAD
    // проверяем disableMobileThead
    if (opts.disableMobileThead !== true) {
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
      // проверяем массив строк и removeMobile для td
      if (opts.table.rows.data.length > 0 && !opts.table.tbody.td.removeMobile) {
        // создаем элемент td
        const td = tr.insertCell(-1);
        // проверяем пользовательские аттрибуты
        if (opts.table.thead.td.attributes) {
          addAttributes(td, opts.table.thead.td.attributes);
        }
      }
      // создаем элемент td
      const td = tr.insertCell(-1);
      // проверяем пользовательские аттрибуты
      if (opts.table.thead.td.attributes) {
        addAttributes(td, opts.table.thead.td.attributes);
      }
      // присваиваем значение из массива колонок элементу th
      td.textContent = opts.table.columns.data[i];
    }

    // TBODY
    // создаем элемент tbody
    const tbody = table.createTBody();
    // проверяем пользовательские аттрибуты
    if (opts.table.tbody.attributes) {
      addAttributes(tbody, opts.table.tbody.attributes);
    }
    // проходим по массиву строк
    for (let k = 0; k < opts.table.rows.data.length; k += 1) {
      // создаем элемент tr
      const tr = tbody.insertRow(-1);
      // проверяем пользовательские аттрибуты
      if (opts.table.tbody.tr.attributes) {
        addAttributes(tr, opts.table.tbody.tr.attributes);
      }
      // проверяем removeMobile для td
      if (!opts.table.tbody.td.removeMobile) {
        // создаем элемент td
        const td = tr.insertCell(-1);
        // проверяем пользовательские аттрибуты
        if (opts.table.tbody.td.attributes) {
          addAttributes(td, opts.table.tbody.td.attributes);
        }
        // присваиваем значение из массива строк элементу td
        td.innerHTML = opts.table.rows.data[k];
      }
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

    fragment.appendChild(table);
  }

  // создаем empty 2d массив
  const virtTables = new Array(opts.table.columns.data.length);
  for (let i = 0; i < virtTables.length; i += 1) {
    virtTables[i] = new Array(opts.table.rows.data.length);
  }

  // EVENTS
  // проходим по массиву событий
  for (let i = 0; i < opts.events.length; i += 1) {
    // проверяем наличие значений объекта события в массивах колонок и строк
    const rowIndex = opts.table.rows.data.indexOf(opts.events[i].row);
    const columnIndex = opts.table.columns.data.indexOf(opts.events[i].column);
    if (rowIndex !== -1 && columnIndex !== -1) {
      // находим таблицу с совпавшим значением колонки
      const table = fragment.querySelectorAll('table')[columnIndex];
      if (table) {
        // находим в таблице tbody
        const tbody = table.querySelector('tbody');
        if (tbody) {
          // находим в tbody tr с совпавшим значением строки
          const tr = tbody.querySelectorAll('tr')[rowIndex];
          // заполняем virtTables
          if (tr) {
            virtTables[columnIndex][rowIndex] = true;
            // находим td в tr
            const td = tr.querySelectorAll('td');
            if (td) {
              // проверяем пользовательские аттрибуты у события
              if (opts.events[i].attributes) {
                addAttributes(td[1], opts.events[i].attributes);
              }
              // присваиваем значение события td
              td[1].innerHTML = opts.events[i].content;
            }
          }
        }
      }
    }
  }

  // проверяем disableEmptyMobileTable
  if (opts.disableEmptyMobileTable === true) {
    // находим таблицы
    const tables = fragment.querySelectorAll('table');
    if (tables.length > 0) {
      // клонируем virtTables
      const clone = virtTables.slice(0);
      // проходим по масиву
      for (let i = 0; i < clone.length; i += 1) {
        if (!clone[i].includes(true)) {
          // все строки пусты удаляем таблицу
          if (tables[i]) {
            tables[i].remove();
          }
          virtTables.splice(i, 1);
        }
      }
    }
  }

  // проверяем disableEmptyMobileRow
  if (opts.disableEmptyMobileRow === true) {
    // находим таблицы
    const tables = fragment.querySelectorAll('table');
    // проверяем таблицы
    if (tables.length > 0) {
      // клонируем virtTables
      const clone = virtTables.slice(0);
      // проходим по массиву
      for (let i = 0; i < clone.length; i += 1) {
        const tbody = tables[i].querySelector('tbody');
        if (tbody) {
          const trs = tbody.querySelectorAll('tr');
          if (trs.length > 0) {
            // клонируем вложенные массивы
            clone[i] = virtTables[i].slice(0);
            // проходим по вложенным массивам
            for (let j = 0; j < clone[i].length; j += 1) {
              // если не true, значит пустая строка
              if (clone[i][j] !== true) {
                // удаляем строку из таблицы
                if (trs[j]) {
                  trs[j].remove();
                }
                // удаляем из virtTables
                virtTables[i].splice(j, 1);
              }
            }
          }
        }
      }
    }
  }

  return fragment;
}
