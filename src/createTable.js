import addAttributes from './addAttributes';

export default function createTable(opts) {
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
  if (opts.table.rows.data.length > 0) {
    th = document.createElement('th');
    if (opts.table.thead.th.attributes) {
      th = addAttributes(th, opts.table.thead.th.attributes);
    }
    tr.appendChild(th);
  }
  for (let i = 0; i < opts.table.columns.data.length; i += 1) {
    th = document.createElement('th');
    if (opts.table.thead.th.attributes) {
      th = addAttributes(th, opts.table.thead.th.attributes);
    }
    th.textContent = opts.table.columns.data[i];
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  // tbody
  let tbody = document.createElement('tbody');
  if (opts.table.tbody.attributes) {
    tbody = addAttributes(tbody, opts.table.tbody.attributes);
  }
  for (let i = 0; i < opts.table.rows.data.length; i += 1) {
    tr = document.createElement('tr');
    if (opts.table.tbody.tr.attributes) {
      tr = addAttributes(tr, opts.table.tbody.tr.attributes);
    }
    th = document.createElement('th');
    if (opts.table.tbody.th.attributes) {
      th = addAttributes(th, opts.table.tbody.th.attributes);
    }
    th.textContent = opts.table.rows.data[i];
    tr.appendChild(th);
    for (let j = 0; j < opts.table.columns.data.length; j += 1) {
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
    const rowIndex = opts.table.rows.data.indexOf(opts.events[i].row);
    const columnIndex = opts.table.columns.data.indexOf(opts.events[i].column);
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
