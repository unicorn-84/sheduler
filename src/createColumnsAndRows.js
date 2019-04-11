import each from 'lodash/each';

export default function createColumnsAndRows(opts) {
  // присваиваем массивы колонок и строк из пользовательских настроек
  const data = {
    columns: opts.table.columns.data || [],
    rows: opts.table.rows.data || [],
  };
  // проходим по массиву событий
  for (let i = 0; i < opts.events.length; i += 1) {
    // проверям свойство column события в массиве колонок
    if (opts.events[i].column && data.columns.indexOf(opts.events[i].column) === -1) {
      // если нет, пушим
      data.columns.push(opts.events[i].column);
    }
    // проверям свойство row события в массиве строк
    if (opts.events[i].row && data.rows.indexOf(opts.events[i].row) === -1) {
      // если нет, пушим
      data.rows.push(opts.events[i].row);
    }
  }
  // проходим по массивам строк и колонок
  each(data, (value, key) => {
    // проверяем пользовательские настройки сортировки
    if (opts.table[key].sort === true) {
      // сортируем строки
      data[key] = data[key].sort();
      // сортируем 'числовые' строки
      data[key] = data[key].sort((a, b) => a - b);
    }
  });
  return data;
}
