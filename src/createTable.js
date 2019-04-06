export default function createTable(opts) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  let tr = document.createElement('tr');
  let th;
  // thead
  for (let i = -1; i < opts.table.columns.length; i += 1) {
    th = document.createElement('th');
    if (i !== -1) {
      th.textContent = opts.table.columns[i];
    }
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  // tbody
  for (let i = 0; i < opts.table.rows.length; i += 1) {
    tr = document.createElement('tr');
    th = document.createElement('th');
    th.textContent = opts.table.rows[i];
    tr.appendChild(th);
    for (let j = 0; j < opts.table.columns.length; j += 1) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  // events
  // todo: Добавить проверку event.column и event.row в columns и rows
  // todo: Добавить проверку на совпадение
  for (let i = 0; i < opts.events.length; i += 1) {
    const rowIndex = opts.table.rows.indexOf(opts.events[i].row);
    const columnIndex = opts.table.columns.indexOf(opts.events[i].column);
    tr = tbody.querySelectorAll('tr')[rowIndex];
    const td = tr.querySelectorAll('td')[columnIndex];
    td.innerHTML = opts.events[i].content;
  }
  table.appendChild(tbody);
  return table;
}
