import _ from 'lodash';
import { assert } from 'chai';
import createWindow from './setup/setup';
import createTable from '../src/createTable';
import options from './options';

suite('#createTable()', () => {
  let opts;
  setup(() => {
    opts = _.defaultsDeep({}, options);
    createWindow();
  });
  suite('table', () => {
    test('должна вернуть table', () => {
      const table = createTable(opts);
      table.innerHTML = '';
      assert.equal(table.outerHTML, '<table id="id" class="table table-bordered table-dark"></table>');
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
      const ths = tr.querySelectorAll('th');
      for (let i = 0; i < ths.length; i += 1) {
        ths[i].innerHTML = '';
        assert.equal(ths[i].outerHTML, '<th class="th"></th>');
      }
    });
    test('у th должен быть контент из columns', () => {
      opts.table.rows.data = [];
      const thead = createTable(opts).querySelector('thead');
      const tr = thead.querySelector('tr');
      const ths = tr.querySelectorAll('th');
      for (let i = 0; i < ths.length; i += 1) {
        assert.equal(ths[i].outerHTML, `<th class="th">${opts.table.columns.data[i]}</th>`);
      }
    });
    test('у tr должен быть первый пустой td, если есть rows', () => {
      const thead = createTable(opts).querySelector('thead');
      const tr = thead.querySelector('tr');
      const tds = tr.querySelectorAll('td');
      assert.equal(tds[0].outerHTML, '<td class="td"></td>');
    });
    // test('должна не отображать первый td', () => {
    //   opts.table.tbody.td.remove = true;
    //   const thead = createTable(opts).querySelector('thead');
    //   const tr = thead.querySelector('tr');
    //   const tds = tr.querySelectorAll('td');
    //   assert.equal(tds.length, opts.table.columns.data.length);
    // });
  });
  suite('tbody', () => {
    test('у table должен быть tbody', () => {
      const tbody = createTable(opts).querySelector('tbody');
      tbody.innerHTML = '';
      assert.equal(tbody.outerHTML, '<tbody class="tbody"></tbody>');
    });
    test('у tbody должны быть tr', () => {
      const tbody = createTable(opts).querySelector('tbody');
      const trs = tbody.querySelectorAll('tr');
      for (let i = 0; i < trs.length; i += 1) {
        trs[i].innerHTML = '';
        assert.equal(trs[i].outerHTML, '<tr class="tr"></tr>');
      }
    });
    test('у tr должен быть первым td с контентом из columns', () => {
      const tbody = createTable(opts).querySelector('tbody');
      const trs = tbody.querySelectorAll('tr');
      for (let i = 0; i < trs.length; i += 1) {
        assert.equal(trs[i].firstChild.outerHTML, `<td class="td">${opts.table.rows.data[i]}</td>`);
      }
    });
    test('у tr должны быть td', () => {
      opts.events = [];
      const tbody = createTable(opts).querySelector('tbody');
      const trs = tbody.querySelectorAll('tr');
      for (let i = 0; i < trs.length; i += 1) {
        const tds = trs[i].querySelectorAll('td');
        for (let j = 0; j < tds.length; j += 1) {
          tds[j].innerHTML = '';
          assert.equal(tds[j].outerHTML, '<td class="td"></td>');
        }
      }
    });
    test('у td должен быть контент', () => {
      opts.events = [];
      const tbody = createTable(opts).querySelector('tbody');
      const trs = tbody.querySelectorAll('tr');
      for (let i = 0; i < trs.length; i += 1) {
        const tds = trs[i].querySelectorAll('td');
        for (let j = 1; j < tds.length; j += 1) {
          assert.equal(tds[j].outerHTML, '<td class="td">-</td>');
        }
      }
    });
    // test('должна не отображать th', () => {
    //   opts.table.tbody.th.remove = true;
    //   const tbody = createTable(opts).querySelector('tbody');
    //   const trs = tbody.querySelectorAll('tr');
    //   for (let i = 0; i < trs.length; i += 1) {
    //     assert.notExists(trs[i].querySelector('th'));
    //   }
    // });
    test('должна не отображать пустые строки', () => {
      opts.table.tbody.tr.removeEmpty = true;
      const tbody = createTable(opts).querySelector('tbody');
      assert.equal(tbody.outerHTML, '<tbody class="tbody"><tr class="tr"><td class="td">vue</td><td class="td">-</td><td class="td">-</td><td class="td bg-dark" data-column="anna">+</td></tr></tbody>');
    });
  });
});
