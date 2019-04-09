import defaultsDeep from 'lodash/defaultsDeep';
import defaultOptions from './defaultOptions';
import createTable from './createTable';
import createMobileTables from './createMobileTables';
import createColumnsAndRows from './createColumnsAndRows';

function scheduler(options) {
  const opts = defaultsDeep(options, defaultOptions);
  const container = document.getElementById(opts.container);
  if (!container) {
    throw new Error('sheduler.js: container не найден');
  }
  const { columns, rows } = createColumnsAndRows(opts);
  if (columns.length === 0 && rows.length === 0) {
    return;
  }
  opts.table.columns.data = columns;
  opts.table.rows.data = rows;
  const mql = window.matchMedia(`(max-width: ${opts.breakpoint})`);
  function screenTest(e = {}) {
    container.innerHTML = '';
    if (e.matches || mql.matches) {
      container.appendChild(createMobileTables(opts));
    } else {
      container.appendChild(createTable(opts));
    }
  }
  mql.addListener(screenTest);
  screenTest();
}

export default scheduler;
