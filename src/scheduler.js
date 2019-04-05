import createTable from './createTable';
import createMobileTables from './createMobileTables';

// todo: Добавить параметр options
function scheduler(options) {
  const opt = options || {};
  const container = document.getElementById(opt.containerId);
  if (!container) {
    throw new Error('sheduler.js: container не найден');
  }
  const mql = window.matchMedia('(max-width: 991px)');
  function screenTest(e = {}) {
    container.innerHTML = '';
    if (e.matches || mql.matches) {
      container.appendChild(createMobileTables());
    } else {
      container.appendChild(createTable());
    }
  }
  mql.addListener(screenTest);
  screenTest();
}

export default scheduler;
