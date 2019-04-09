import _ from 'lodash';
import { assert } from 'chai';
import createWindow from './setup/setup';
import createTable from '../src/createTable';
import options from './options';

suite('#createTable', () => {
  let opts;
  setup(() => {
    opts = _.defaultsDeep({}, options);
    createWindow();
  });
  suite('table', () => {
    test('должна вернуть table', () => {
      const table = createTable(opts);
      table.innerHTML = '';
      assert.equal(table.outerHTML, '<table class="table table-bordered table-dark" disabled="false"></table>');
    });
  });
  suite('thead', () => {
    test('у table должен быть thead', () => {
      const thead = createTable(opts).querySelector('thead');
      thead.innerHTML = '';
      assert.equal(thead.outerHTML, '<thead class="thead"></thead>');
    });
    test('у thead должен быть tr', () => {
      const thead = createTable(opts).querySelector('thead');
      const tr = thead.querySelector('tr');
      tr.innerHTML = '';
      assert.equal(tr.outerHTML, '<tr class="tr"></tr>');
    });
    test('у tr должны быть th', () => {
      const thead = createTable(opts).querySelector('thead');
      const tr = thead.querySelector('tr');
      const th = tr.querySelectorAll('th');
      for (let i = 0; i < th.length; i += 1) {
        th[i].innerHTML = '';
        assert.equal(th[i].outerHTML, '<th class="th"></th>');
      }
    });
    test('у th должен быть контент из columns', () => {
      opts.table.rows.data = [];
      const thead = createTable(opts).querySelector('thead');
      const tr = thead.querySelector('tr');
      const th = tr.querySelectorAll('th');
      for (let i = 0; i < th.length; i += 1) {
        assert.equal(th[i].outerHTML, `<th class="th">${opts.table.columns.data[i]}</th>`);
      }
    });
    test('у tr должен быть первый пустой th, если есть rows', () => {
      const thead = createTable(opts).querySelector('thead');
      const tr = thead.querySelector('tr');
      const th = tr.querySelectorAll('th');
      assert.equal(th[0].outerHTML, '<th class="th"></th>');
    });
  });
  suite('tbody', () => {
    test('у table должен быть tbody', () => {
      const tbody = createTable(opts).querySelector('tbody');
      tbody.innerHTML = '';
      assert.equal(tbody.outerHTML, '<tbody class="tbody"></tbody>');
    });
    test('у tbody должны быть tr', () => {
      const tbody = createTable(opts).querySelector('tbody');
      const tr = tbody.querySelectorAll('tr');
      for (let i = 0; i < tr.length; i += 1) {
        tr[i].innerHTML = '';
        assert.equal(tr[i].outerHTML, '<tr class="tr"></tr>');
      }
    });
    test('у tr должны быть первыми th с контентом из columns', () => {
      const tbody = createTable(opts).querySelector('tbody');
      const tr = tbody.querySelectorAll('tr');
      for (let i = 0; i < tr.length; i += 1) {
        assert.equal(tr[i].firstChild.outerHTML, `<th class="th">${opts.table.rows.data[i]}</th>`);
      }
    });
    test('у tr должны быть td', () => {
      opts.table.tbody.td.content = '';
      const tbody = createTable(opts).querySelector('tbody');
      const tr = tbody.querySelectorAll('tr');
      for (let i = 0; i < tr.length; i += 1) {
        const td = tr[i].querySelectorAll('td');
        for (let j = 0; j < td.length; j += 1) {
          td.innerHTML = '';
          assert.equal(td[i].outerHTML, '<td class="td"></td>');
        }
      }
    });
    test('у td должен быть контент', () => {
      const tbody = createTable(opts).querySelector('tbody');
      const tr = tbody.querySelectorAll('tr');
      for (let i = 0; i < tr.length; i += 1) {
        const td = tr[i].querySelectorAll('td');
        for (let j = 0; j < td.length; j += 1) {
          assert.equal(td[i].outerHTML, `<td class="td">${opts.table.tbody.td.content}</td>`);
        }
      }
      console.log(tbody.outerHTML);
    });
  });
});
