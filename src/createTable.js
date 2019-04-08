import addAttributes from './addAttributes';

export default function createTable(opts) {
  if (opts.table.columns.length === 0 && opts.table.rows.length === 0) {
    return;
  }
  let table = document.createElement('table');
  if (opts.table.attributes) {
    table = addAttributes(table, opts.table.attributes);
  }
  let thead = document.createElement('thead');
  if (opts.table.thead.attributes) {
    thead = addAttributes(thead, opts.table.thead.attributes);
  }
  let tr = document.createElement('tr');
  if (opts.table.thead.tr.attributes) {
    tr = addAttributes(tr, opts.table.thead.tr.attributes);
  }
  let th;
  // thead
  for (let i = -1; i < opts.table.columns.length; i += 1) {
    th = document.createElement('th');
    if (opts.table.thead.th.attributes) {
      th = addAttributes(th, opts.table.thead.th.attributes);
    }
    if (i !== -1) {
      th.textContent = opts.table.columns[i];
    }
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  // tbody
  let tbody = document.createElement('tbody');
  if (opts.table.tbody.attributes) {
    tbody = addAttributes(tbody, opts.table.tbody.attributes);
  }
  for (let i = 0; i < opts.table.rows.length; i += 1) {
    tr = document.createElement('tr');
    if (opts.table.tbody.tr.attributes) {
      tr = addAttributes(tr, opts.table.tbody.tr.attributes);
    }
    th = document.createElement('th');
    if (opts.table.tbody.th.attributes) {
      th = addAttributes(th, opts.table.tbody.th.attributes);
    }
    th.textContent = opts.table.rows[i];
    tr.appendChild(th);
    for (let j = 0; j < opts.table.columns.length; j += 1) {
      let td = document.createElement('td');
      if (opts.table.tbody.td.attributes) {
        td = addAttributes(td, opts.table.tbody.td.attributes);
      }
      td.innerHTML = opts.table.tbody.td.content;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  // events
  // todo: Добавить проверку на совпадение
  for (let i = 0; i < opts.events.length; i += 1) {
    const rowIndex = opts.table.rows.indexOf(opts.events[i].row);
    const columnIndex = opts.table.columns.indexOf(opts.events[i].column);
    if (rowIndex !== -1 && columnIndex !== -1) {
      tr = tbody.querySelectorAll('tr')[rowIndex];
      let td = tr.querySelectorAll('td')[columnIndex];
      if (opts.events[i].attributes) {
        td = addAttributes(td, opts.events[i].attributes);
      }
      td.innerHTML = opts.events[i].content;
    }
  }
  table.appendChild(tbody);
  return table;
}
