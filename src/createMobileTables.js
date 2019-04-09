import addAttributes from './addAttributes';

export default function createMobileTables(opts) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < opts.table.columns.length; i += 1) {
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
    // thead
    for (let j = 0; j < 2; j += 1) {
      let th = document.createElement('th');
      if (opts.table.thead.th.attributes) {
        th = addAttributes(th, opts.table.thead.th.attributes);
      }
      if (j !== 0) {
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
    for (let k = 0; k < opts.table.rows.length; k += 1) {
      tr = document.createElement('tr');
      if (opts.table.tbody.tr.attributes) {
        tr = addAttributes(tr, opts.table.tbody.tr.attributes);
      }
      let th = document.createElement('th');
      if (opts.table.tbody.th.attributes) {
        th = addAttributes(th, opts.table.tbody.th.attributes);
      }
      th.textContent = opts.table.rows[k];
      tr.appendChild(th);
      let td = document.createElement('td');
      if (opts.table.tbody.td.attributes) {
        td = addAttributes(td, opts.table.tbody.td.attributes);
      }
      td.innerHTML = opts.table.tbody.td.content;
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    // events
    table.appendChild(tbody);
    fragment.appendChild(table);
  }
  // events
  // todo: Добавить проверку на совпадение
  for (let i = 0; i < opts.events.length; i += 1) {
    const rowIndex = opts.table.rows.indexOf(opts.events[i].row);
    const columnIndex = opts.table.columns.indexOf(opts.events[i].column);
    if (rowIndex !== -1 && columnIndex !== -1) {
      const table = fragment.querySelectorAll('table')[columnIndex];
      const tbody = table.querySelector('tbody');
      const tr = tbody.querySelectorAll('tr')[rowIndex];
      let td = tr.querySelector('td');
      if (opts.events[i].attributes) {
        td = addAttributes(td, opts.events[i].attributes);
      }
      td.innerHTML = opts.events[i].content;
    }
  }
  return fragment;
}
