import defaultsDeep from 'lodash/defaultsDeep';
import defaultOpts from './defaultOpts';
import createTable from './createTable';
import createMobileTables from './createMobileTables';

function scheduler(options) {
  const opts = defaultsDeep(options, defaultOpts);
  const container = document.getElementById(opts.container);
  if (!container) {
    throw new Error('sheduler.js: container не найден');
  }
  const mql = window.matchMedia(`(max-width: ${opts.breakpoint})`);
  function screenTest(e = {}) {
    container.innerHTML = '';
    if (e.matches || mql.matches) {
      container.appendChild(createMobileTables(opts));
    } else {
      container.appendChild(createTable(opts));
    }
  }
  if (opts.table.columns.length > 0 && opts.table.rows.length > 0) {
    mql.addListener(screenTest);
    screenTest();
  }
}

export default scheduler;
