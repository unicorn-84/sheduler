import { columns, events, rows } from './options';


export default function createTable() {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  let tr = document.createElement('tr');
  let th;
  // thead
  for (let i = -1; i < columns.length; i += 1) {
    th = document.createElement('th');
    if (i !== -1) {
      th.textContent = columns[i];
    }
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  // tbody
  for (let i = 0; i < rows.length; i += 1) {
    tr = document.createElement('tr');
    th = document.createElement('th');
    th.textContent = rows[i];
    tr.appendChild(th);
    for (let j = 0; j < columns.length; j += 1) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  // events
  // todo: Добавить проверку event.column и event.row в columns и rows
  // todo: Добавить проверку на совпадение
  for (let i = 0; i < events.length; i += 1) {
    const rowIndex = rows.indexOf(events[i].row);
    const columnIndex = columns.indexOf(events[i].column);
    tr = tbody.querySelectorAll('tr')[rowIndex];
    const td = tr.querySelectorAll('td')[columnIndex];
    td.textContent = events[i].content;
  }
  table.appendChild(tbody);
  return table;
}
