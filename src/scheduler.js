import createTable from './createTable';
import createMobileTables from './createMobileTables';
import { options } from './options';

function scheduler() {
  const container = document.getElementById(options.containerId);
  if (!container) {
    return;
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
