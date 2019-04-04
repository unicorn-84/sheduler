import createTable from './createTable';
import createMobileTables from './createMobileTables';
import { options } from './options';

// todo: Добавить параметр options
function scheduler() {
  const container = document.getElementById(options.containerId);
  if (!container) {
    // todo: 'Должна бросить ошибку, если container не найден'
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
