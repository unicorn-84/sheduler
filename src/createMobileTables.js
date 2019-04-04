import { columns, events, rows } from './options';

export default function createMobileTables() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < columns.length; i += 1) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    // thead
    for (let j = 0; j < 2; j += 1) {
      const th = document.createElement('th');
      if (j !== 0) {
        th.textContent = columns[i];
      }
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    // tbody
    for (let k = 0; k < rows.length; k += 1) {
      tr = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = rows[k];
      tr.appendChild(th);
      const td = document.createElement('td');
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    // events
    table.appendChild(tbody);
    fragment.appendChild(table);
  }
  // events
  // todo: Добавить проверку event.column и event.row в columns и rows
  // todo: Добавить проверку на совпадение
  for (let i = 0; i < events.length; i += 1) {
    const rowIndex = rows.indexOf(events[i].row);
    const columnIndex = columns.indexOf(events[i].column);
    const table = fragment.querySelectorAll('table')[columnIndex];
    const tbody = table.querySelector('tbody');
    const tr = tbody.querySelectorAll('tr')[rowIndex];
    tr.querySelector('td').textContent = events[i].content;
  }
  return fragment;
}
