import _ from 'lodash';
import { assert } from 'chai';
import createColumnsAndRows from '../src/createColumnsAndRows';
import options from './options';

suite('#createColumnsAndRows()', () => {
  let opts;
  setup(() => {
    opts = _.cloneDeep(options);
  });
  test('должна вернуть массив значений колонок', () => {
    const { columns } = createColumnsAndRows(opts);
    assert.deepEqual(columns, ['vlad', 'ivan', 'anna']);
  });
  test('должна вернуть массив значений строк', () => {
    const { rows } = createColumnsAndRows(opts);
    assert.deepEqual(rows, ['vue', 'polymer', 'react']);
  });
  test('должна сортировать массив значений колонок', () => {
    opts.columns.data.push('1', '09:30', '09:45');
    opts.columns.sort = true;
    const { columns } = createColumnsAndRows(opts);
    assert.deepEqual(columns, ['09:30', '09:45', '1', 'anna', 'ivan', 'vlad']);
  });
  test('должна сортировать массив значений строк', () => {
    opts.rows.data.push('2', '15', 'Пн');
    opts.rows.sort = true;
    const { rows } = createColumnsAndRows(opts);
    assert.deepEqual(rows, ['2', '15', 'polymer', 'react', 'vue', 'Пн']);
  });
  test('должна добавлять в массив значений колонок уникальное значение', () => {
    opts.events.push({ column: 'lena' });
    const { columns } = createColumnsAndRows(opts);
    assert.deepEqual(columns, ['vlad', 'ivan', 'anna', 'lena']);
  });
  test('должна добавлять в массив значений строк уникальное значение', () => {
    opts.events.push({ row: 'aurelia' });
    const { rows } = createColumnsAndRows(opts);
    assert.deepEqual(rows, ['vue', 'polymer', 'react', 'aurelia']);
  });
});
