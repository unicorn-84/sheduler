import { assert } from 'chai';
import createWindow from './setup/setup';
import createTable from '../src/createTable';
import createMobileTables from '../src/createMobileTables';
import options from '../src/options';

const { events } = options;
const { columns, rows } = options.table;

suite('SCHEDULER', () => {
  let container;
  setup(() => {
    createWindow();
    container = document.getElementById(options.container);
  });
  suite('#scheduler()', () => {
    test('должна бросить ошибку, если container не найден', () => {
      options.container = 'bad-container';
      assert.throw(() => window.scheduler(options), 'sheduler.js: container не найден');
      options.container = 'scheduler-container';
    });
    test('должна удалять элементы из container', () => {
      const el = document.createElement('abbr');
      container.appendChild(el);
      window.scheduler(options);
      assert.notExists(container.querySelector('abbr'));
    });
    test('должна добавлять элементы table в container', () => {
      window.scheduler(options);
      assert.notEqual(container.getElementsByTagName('table').length, 0);
    });
    test(`должна добавлять table в container для ширины viewport больше ${options.breakpoint}px`, () => {
      window.resizeTo(992);
      window.scheduler(options);
      assert.equal(container.getElementsByTagName('table').length, 1);
      window.resizeTo(1024);
    });
    test(`должна добавлять ${columns.length} table в container для ширины viewport меньше или равно ${options.breakpoint}px`, () => {
      window.resizeTo(options.breakpoint);
      window.scheduler(options);
      assert.equal(container.getElementsByTagName('table').length, columns.length);
      window.resizeTo(1024);
    });
    test('должна менять таблицы при смене размеров viewport', () => {
      window.scheduler(options);
      assert.equal(container.getElementsByTagName('table').length, 1);
      window.resizeTo(540);
      assert.equal(container.getElementsByTagName('table').length, columns.length);
      window.resizeTo(1024);
    });
  });
  suite('#createTable', () => {
    test('должна вернуть table', () => {
      assert.equal(createTable(options).nodeName, 'TABLE');
      assert.equal(createTable(options).childElementCount, 2);
      assert.equal(createTable(options).children[0].nodeName, 'THEAD');
      assert.equal(createTable(options).children[1].nodeName, 'TBODY');
    });
    test('у table должен быть thead', () => {
      const thead = createTable(options).querySelector('thead');
      for (let i = 1; i < columns.length; i += 1) {
        const th = thead.querySelectorAll('th')[i];
        assert.equal(th.textContent, columns[i - 1]);
      }
    });
    test('у table должен быть tbody', () => {
      const tbody = createTable(options).querySelector('tbody');
      assert.equal(tbody.childElementCount, rows.length);
      for (let i = 0; i < rows.length; i += 1) {
        const tr = tbody.querySelectorAll('tr')[i];
        assert.equal(tr.querySelector('th').textContent, rows[i]);
        assert.equal(tr.querySelectorAll('td').length, columns.length);
      }
    });
    test('у td должен быть контент из events', () => {
      const tbody = createTable(options).querySelector('tbody');
      for (let i = 0; i < events.length; i += 1) {
        const rowIndex = rows.indexOf(events[i].row);
        const columnIndex = columns.indexOf(events[i].column);
        const tr = tbody.querySelectorAll('tr')[rowIndex];
        assert.equal(tr.querySelectorAll('td')[columnIndex].innerHTML, events[i].content);
      }
    });
  });
  suite('#createMobileTables', () => {
    test('должна вернуть fragment с table', () => {
      assert.equal(createMobileTables(options).nodeName, '#document-fragment');
      assert.equal(createMobileTables(options).querySelectorAll('table').length, columns.length);
      for (let i = 0; i < columns.length; i += 1) {
        assert.equal(createMobileTables(options).querySelectorAll('table')[i].nodeName, 'TABLE');
      }
    });
    test('у table должен быть thead', () => {
      for (let i = 0; i < columns.length; i += 1) {
        const table = createMobileTables(options).querySelectorAll('table')[i];
        assert.equal(table.querySelector('thead').outerHTML, `<thead><tr><th></th><th>${columns[i]}</th></tr></thead>`);
      }
    });
    test('у table должен быть tbody', () => {
      for (let i = 0; i < columns.length; i += 1) {
        const table = createMobileTables(options).querySelectorAll('table')[i];
        const tbody = table.querySelector('tbody');
        assert.exists(tbody);
      }
    });
    test('у tbody должен быть th', () => {
      for (let i = 0; i < columns.length; i += 1) {
        const table = createMobileTables(options).querySelectorAll('table')[i];
        const tbody = table.querySelector('tbody');
        for (let j = 0; j < rows.length; j += 1) {
          const tr = tbody.querySelectorAll('tr')[j];
          assert.equal(tr.querySelector('th').textContent, rows[j]);
        }
      }
    });
    test('у tbody должны быть td', () => {
      for (let i = 0; i < columns.length; i += 1) {
        const table = createMobileTables(options).querySelectorAll('table')[i];
        const tbody = table.querySelector('tbody');
        const td = tbody.querySelectorAll('td');
        assert.equal(td.length, rows.length);
      }
    });
    test('у td должен быть контент из events', () => {
      for (let i = 0; i < events.length; i += 1) {
        const rowIndex = rows.indexOf(events[i].row);
        const columnIndex = columns.indexOf(events[i].column);
        const table = createMobileTables(options).querySelectorAll('table')[columnIndex];
        const tbody = table.querySelector('tbody');
        const tr = tbody.querySelectorAll('tr')[rowIndex];
        assert.equal(tr.querySelector('td').innerHTML, events[i].content);
      }
    });
  });
});
