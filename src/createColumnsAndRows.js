import each from 'lodash/each';

export default function createColumnsAndRows(opts) {
  const data = {
    columns: opts.table.columns.data || [],
    rows: opts.table.rows.data || [],
  };
  for (let i = 0; i < opts.events.length; i += 1) {
    if (data.columns.indexOf(opts.events[i].column) === -1) {
      data.columns.push(opts.events[i].column);
    }
    if (data.rows.indexOf(opts.events[i].row) === -1) {
      data.rows.push(opts.events[i].row);
    }
  }
  each(data, (value, key) => {
    if (opts.table[key].sort === true) {
      data[key] = data[key].sort();
      data[key] = data[key].sort((a, b) => a - b);
    }
  });
  return data;
}
