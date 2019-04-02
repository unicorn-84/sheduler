import { assert } from 'chai';
import createWindow from './setup/setup';
import createTable from '../src/createTable';
import createMobileTables from '../src/createMobileTables';
import { columns, rows, options } from '../src/options';

suite('SCHEDULER', () => {
  let container;
  setup(() => {
    createWindow();
    container = document.getElementById('scheduler-container');
  });
  suite('#scheduler()', () => {
    test('должна удалять элементы из container', () => {
      const el = document.createElement('p');
      container.appendChild(el);
      window.scheduler();
      assert.notExists(container.querySelector('p'));
    });
    test('должна добавлять элементы table в container', () => {
      window.scheduler();
      assert.notEqual(container.getElementsByTagName('table').length, 0);
    });
    test(`должна добавлять table в container для ширины viewport больше ${options.breakpoint}px`, () => {
      window.resizeTo(992);
      window.scheduler();
      assert.equal(container.getElementsByTagName('table').length, 1);
      window.resizeTo(1024);
    });
    test(`должна добавлять ${columns.length} table в container для ширины viewport меньше или равно ${options.breakpoint}px`, () => {
      window.resizeTo(options.breakpoint);
      window.scheduler();
      assert.equal(container.getElementsByTagName('table').length, columns.length);
      window.resizeTo(1024);
    });
    test('должна менять таблицы при смене размеров viewport', () => {
      window.scheduler();
      assert.equal(container.getElementsByTagName('table').length, 1);
      window.resizeTo(540);
      assert.equal(container.getElementsByTagName('table').length, columns.length);
      window.resizeTo(1024);
    });
  });
  suite('#createTable', () => {
    test('должна вернуть table', () => {
      assert.equal(createTable().nodeName, 'TABLE');
      assert.equal(createTable().childElementCount, 2);
      assert.equal(createTable().children[0].nodeName, 'THEAD');
      assert.equal(createTable().children[1].nodeName, 'TBODY');
    });
    test('у table должен быть thead', () => {
      const thead = createTable().querySelector('thead');
      for (let i = 1; i < columns.length; i += 1) {
        const th = thead.querySelectorAll('th')[i];
        assert.equal(th.textContent, columns[i - 1]);
      }
    });
    test('у table должен быть tbody', () => {
      const tbody = createTable().querySelector('tbody');
      assert.equal(tbody.childElementCount, rows.length);
      for (let i = 0; i < rows.length; i += 1) {
        const tr = tbody.querySelectorAll('tr')[i];
        assert.equal(tr.querySelector('th').textContent, rows[i]);
        assert.equal(tr.querySelectorAll('td').length, columns.length);
      }
    });
  });
  suite('#createMobileTables', () => {
    test('должна вернуть fragment с table', () => {
      assert.equal(createMobileTables().nodeName, '#document-fragment');
      assert.equal(createMobileTables().querySelectorAll('table').length, columns.length);
      for (let i = 0; i < columns.length; i += 1) {
        assert.equal(createMobileTables().querySelectorAll('table')[i].nodeName, 'TABLE');
      }
    });
    test('у table должен быть thead', () => {
      for (let i = 0; i < columns.length; i += 1) {
        const table = createMobileTables().querySelectorAll('table')[i];
        assert.equal(table.querySelector('thead').outerHTML, `<thead><tr><th></th><th>${columns[i]}</th></tr></thead>`);
      }
    });
    test('у table должен быть tbody', () => {
      for (let i = 0; i < columns.length; i += 1) {
        const table = createMobileTables().querySelectorAll('table')[i];
        const tbody = table.querySelector('tbody');
        for (let j = 0; j < rows.length; j += 1) {
          const tr = tbody.querySelectorAll('tr')[j];
          assert.equal(tr.outerHTML, `<tr><th>${rows[j]}</th><td></td></tr>`);
        }
      }
    });
  });
});
