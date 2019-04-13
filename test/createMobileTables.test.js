import _ from 'lodash';
import { assert } from 'chai';
import createWindow from './setup/setup';
import options from './options';
import createMobileTables from '../src/createMobileTables';

suite('#createMobileTable()', () => {
  let opts;
  setup(() => {
    opts = _.defaultsDeep({}, options);
    createWindow();
  });
  suite('tables', () => {
    test('должна вернуть fragment с table', () => {
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        tables[i].innerHTML = '';
        assert.equal(tables[i].outerHTML, '<table class="table table-bordered table-dark"></table>');
      }
    });
    test('у table не должно быть id', () => {
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        assert.isFalse(tables[i].hasAttribute('id'));
      }
    });
    test('у table должен быть data-index', () => {
      opts.indexing = true;
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        assert.equal(tables[i].getAttribute('data-index'), i);
      }
    });
    test('должна не отображать table, если нет событий', () => {
      opts.table.disableEmptyMobile = true;
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      assert.equal(tables.length, 1);
    });
  });
  suite('thead', () => {
    test('у table должен быть thead', () => {
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const thead = tables[i].querySelector('thead');
        thead.innerHTML = '';
        assert.equal(thead.outerHTML, '<thead class="thead"></thead>');
      }
    });
    test('у thead должен быть tr', () => {
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const thead = tables[i].querySelector('thead');
        const tr = thead.querySelector('tr');
        tr.innerHTML = '';
        assert.equal(tr.outerHTML, '<tr class="tr"></tr>');
      }
    });
    test('у tr должны быть td', () => {
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const thead = tables[i].querySelector('thead');
        const tr = thead.querySelector('tr');
        const tds = tr.querySelectorAll('td');
        for (let j = 0; j < tds.length; j += 1) {
          tds[j].innerHTML = '';
          assert.equal(tds[j].outerHTML, '<td class="td"></td>');
        }
      }
    });
    test('у td должен быть контент из columns', () => {
      opts.table.rows.data = [];
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const thead = tables[i].querySelector('thead');
        const tr = thead.querySelector('tr');
        const td = tr.querySelector('td');
        assert.equal(td.outerHTML, `<td class="td">${opts.table.columns.data[i]}</td>`);
      }
    });
    test('у tr должен быть первый пустой td, если есть rows', () => {
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const thead = tables[i].querySelector('thead');
        const tr = thead.querySelector('tr');
        const tds = tr.querySelectorAll('td');
        assert.equal(tds[0].outerHTML, '<td class="td"></td>');
      }
    });
    // test('должна не отображать первый td', () => {
    //   opts.table.tbody.td.removeMobile = true;
    //   const fragment = createMobileTables(opts);
    //   const tables = fragment.querySelectorAll('table');
    //   for (let i = 0; i < tables.length; i += 1) {
    //     const thead = tables[i].querySelector('thead');
    //     const tr = thead.querySelector('tr');
    //     assert.equal(tr.outerHTML, `<tr class="tr"><td class="td">${opts.table.columns.data[i]}</td></tr>`);
    //   }
    // });
  });
  suite('tbody', () => {
    test('у table должен быть tbody', () => {
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const tbody = tables[i].querySelector('tbody');
        tbody.innerHTML = '';
        assert.equal(tbody.outerHTML, '<tbody class="tbody"></tbody>');
      }
    });
    test('у tbody должны быть tr', () => {
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const tbody = tables[i].querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        for (let j = 0; j < trs.length; j += 1) {
          trs[j].innerHTML = '';
          assert.equal(trs[j].outerHTML, '<tr class="tr"></tr>');
        }
      }
    });
    test('у tr должен быть первым td с контентом из columns', () => {
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const tbody = tables[i].querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        for (let j = 0; j < trs.length; j += 1) {
          assert.equal(trs[j].firstChild.outerHTML, `<td class="td">${opts.table.rows.data[j]}</td>`);
        }
      }
    });
    test('у tr должны быть td', () => {
      opts.events = [];
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const tbody = tables[i].querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        for (let j = 0; j < trs.length; j += 1) {
          const td = trs[j].querySelector('td');
          td.innerHTML = '';
          assert.equal(td.outerHTML, '<td class="td"></td>');
        }
      }
    });
    test('у td должен быть контент', () => {
      opts.events = [];
      const fragment = createMobileTables(opts);
      const tables = fragment.querySelectorAll('table');
      for (let i = 0; i < tables.length; i += 1) {
        const tbody = tables[i].querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        for (let j = 0; j < trs.length; j += 1) {
          const td = trs[j].querySelectorAll('td');
          assert.equal(td[1].outerHTML, '<td class="td">-</td>');
        }
      }
    });
    // test('должна не отображать th', () => {
    //   opts.table.tbody.th.removeMobile = true;
    //   const fragment = createMobileTables(opts);
    //   const tables = fragment.querySelectorAll('table');
    //   for (let i = 0; i < tables.length; i += 1) {
    //     const tbody = tables[i].querySelector('tbody');
    //     const tr = tbody.querySelector('tr');
    //     const th = tr.querySelector('th');
    //     assert.notExists(th);
    //   }
    // });
    // test('должна не отображать tr', () => {
    //   opts.table.tbody.tr.removeEmptyMobile = true;
    //   const fragment = createMobileTables(opts);
    //   const tables = fragment.querySelectorAll('table');
    //   let tbody = tables[0].querySelector('tbody');
    //   assert.equal(tbody.outerHTML, '<tbody class="tbody"></tbody>');
    //   tbody = tables[1].querySelector('tbody');
    //   assert.equal(tbody.outerHTML, '<tbody class="tbody"></tbody>');
    //   tbody = tables[2].querySelector('tbody');
    //   assert.equal(tbody.outerHTML, '<tbody class="tbody"><tr class="tr"><td class="td">vue</td><td class="td bg-dark" data-column="anna">+</td></tr></tbody>');
    // });
  });
});
