import { columns, rows } from './options';

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
    table.appendChild(tbody);
    fragment.appendChild(table);
  }
  return fragment;
}
