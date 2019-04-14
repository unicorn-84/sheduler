import defaultsDeep from 'lodash/defaultsDeep';
import defaultOptions from './defaultOptions';
import createTable from './createTable';
import createMobileTables from './createMobileTables';
import createColumnsAndRows from './createColumnsAndRows';

export default function scheduler(options) {
  // создаем объект опций
  const opts = defaultsDeep(options, defaultOptions);
  // находим container в document
  const container = document.getElementById(opts.container);
  // проверяем container
  if (!container) {
    throw new Error('sheduler.js: container не найден');
  }
  // создаем массивы колонок и строк
  const { columns, rows } = createColumnsAndRows(opts);
  // проверяем массивы колонок и строк
  if (columns.length === 0 && rows.length === 0) {
    return;
  }
  // присваиваем массивы колонок и строк
  opts.table.columns.data = columns;
  opts.table.rows.data = rows;
  // проверяем breakpoint
  let mql = {};
  if (opts.breakpoint && typeof opts.breakpoint === 'string') {
    // создаем объект MediaQueryList
    mql = window.matchMedia(`(max-width: ${opts.breakpoint})`);
  }
  function screenTest(e = {}) {
    // очищаем container
    container.innerHTML = '';
    // проверяем статус media query
    if (e.matches || mql.matches) {
      // добавляем DocumentFragment в container
      container.appendChild(createMobileTables(opts));
    } else {
      // добавляем table в container
      const table = createTable(opts);
      if (table) {
        container.appendChild(table);
      }
    }
  }
  // проверяем breakpoint
  if (opts.breakpoint) {
    // добавляем слушатель на изменение статуса media query
    mql.addListener(screenTest);
  }
  screenTest();
}
