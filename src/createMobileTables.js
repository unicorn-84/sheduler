import compact from 'lodash/compact';
import addAttributes from './addAttributes';

export default function createMobileTables(opts) {
  // создаем DocumentFragment
  const fragment = document.createDocumentFragment();

  // проходим по массиву колонок
  for (let i = 0; i < opts.columns.data.length; i += 1) {
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
      // проверяем массив строк
      if (opts.rows.data.length > 0) {
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
      td.textContent = opts.columns.data[i];
    }

    // TBODY
    // создаем элемент tbody
    const tbody = table.createTBody();
    // проверяем пользовательские аттрибуты
    if (opts.table.tbody.attributes) {
      addAttributes(tbody, opts.table.tbody.attributes);
    }
    // проходим по массиву строк
    for (let k = 0; k < opts.rows.data.length; k += 1) {
      // создаем элемент tr
      const tr = tbody.insertRow(-1);
      // проверяем пользовательские аттрибуты
      if (opts.table.tbody.tr.attributes) {
        addAttributes(tr, opts.table.tbody.tr.attributes);
      }
      let td = tr.insertCell(-1);
      // проверяем пользовательские аттрибуты
      if (opts.table.tbody.td.attributes) {
        addAttributes(td, opts.table.tbody.td.attributes);
      }
      // присваиваем значение из массива строк элементу td
      td.innerHTML = opts.rows.data[k];
      // создаем элемент td
      td = tr.insertCell(-1);
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
  let virtTables = Array.from(new Array(opts.columns.data.length),
    () => Array.from(new Array(opts.rows.data.length), () => null));

  // EVENTS
  // проходим по массиву событий
  for (let i = 0; i < opts.events.length; i += 1) {
    // проверяем наличие значений объекта события в массивах колонок и строк
    const rowIndex = opts.rows.data.indexOf(opts.events[i].row);
    const columnIndex = opts.columns.data.indexOf(opts.events[i].column);
    if (rowIndex !== -1 && columnIndex !== -1) {
      // находим таблицу с совпавшим значением колонки
      const tables = fragment.querySelectorAll('table');
      if (tables.length > 0) {
        // находим в таблице tbody
        const tbody = tables[columnIndex].querySelector('tbody');
        if (tbody) {
          // находим в tbody tr с совпавшим значением строки
          const trs = tbody.querySelectorAll('tr');
          if (trs.length > 0) {
            // заполняем virtTables
            virtTables[columnIndex][rowIndex] = true;
            // находим td в tr
            const tds = trs[rowIndex].querySelectorAll('td');
            if (tds.length > 0) {
              // проверяем пользовательские аттрибуты у события
              if (opts.events[i].attributes) {
                addAttributes(tds[1], opts.events[i].attributes);
              }
              // присваиваем значение события td
              tds[1].innerHTML = opts.events[i].content;
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
      // проходим по масиву
      for (let i = 0; i < virtTables.length; i += 1) {
        if (!virtTables[i].includes(true)) {
          // все строки пусты удаляем таблицу
          if (tables[i]) {
            tables[i].remove();
            virtTables[i] = null;
          }
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
      // проходим по массиву
      virtTables = compact(virtTables);
      for (let i = 0; i < virtTables.length; i += 1) {
        const tbody = tables[i].querySelector('tbody');
        if (tbody) {
          const trs = tbody.querySelectorAll('tr');
          if (trs.length > 0) {
            // проходим по вложенным массивам
            for (let j = 0; j < virtTables[i].length; j += 1) {
              // если не true, значит пустая строка
              if (virtTables[i][j] !== true) {
                // удаляем строку из таблицы
                if (trs[j]) {
                  trs[j].remove();
                  // удаляем из virtTables
                  virtTables[i][j] = null;
                }
              }
            }
          }
        }
      }
    }
  }

  // проверяем disableFirstMobileColumn
  if (opts.disableFirstMobileColumn) {
    // находим таблицы
    const tables = fragment.querySelectorAll('table');
    if (tables.length > 0) {
      for (let i = 0; i < tables.length; i += 1) {
        const thead = tables[i].querySelector('thead');
        const tbody = tables[i].querySelector('tbody');
        if (thead) {
          const tds = thead.querySelectorAll('td');
          if (tds.length > 0) {
            tds[0].remove();
          }
        }
        if (tbody) {
          const trs = tbody.querySelectorAll('tr');
          if (trs.length > 0) {
            for (let j = 0; j < trs.length; j += 1) {
              const firstTd = trs[j].children[0];
              if (firstTd) {
                firstTd.remove();
              }
            }
          }
        }
      }
    }
  }

  return fragment;
}
