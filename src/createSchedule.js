const containerId = 'scheduler-container';
const rows = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const columns = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

function createSchedule() {
  const container = window.document.getElementById(containerId);
  if (!container) {
    return;
  }
  columns.forEach((column) => {
    const table = window.document.createElement('table');
    const thead = table.createTHead();
    thead.insertAdjacentHTML('beforeend', `<tr><th></th><th>${column}</th></tr>`);
    const tbody = table.createTBody();
    rows.forEach((row) => {
      tbody.insertAdjacentHTML('beforeend', `<tr><th>${row}</th><td></td></tr>`);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
  });
}

export default createSchedule;
