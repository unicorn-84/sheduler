export default function createMobileTables(opts) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < opts.table.columns.length; i += 1) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    // thead
    for (let j = 0; j < 2; j += 1) {
      const th = document.createElement('th');
      if (j !== 0) {
        th.textContent = opts.table.columns[i];
      }
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    // tbody
    for (let k = 0; k < opts.table.rows.length; k += 1) {
      tr = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = opts.table.rows[k];
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
  for (let i = 0; i < opts.events.length; i += 1) {
    const rowIndex = opts.table.rows.indexOf(opts.events[i].row);
    const columnIndex = opts.table.columns.indexOf(opts.events[i].column);
    const table = fragment.querySelectorAll('table')[columnIndex];
    const tbody = table.querySelector('tbody');
    const tr = tbody.querySelectorAll('tr')[rowIndex];
    tr.querySelector('td').innerHTML = opts.events[i].content;
  }
  return fragment;
}
