import { columns, rows } from './options';


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
  table.appendChild(tbody);
  return table;
}
