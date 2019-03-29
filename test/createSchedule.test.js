import { assert } from 'chai';
import createWindow from './setup';

const columns = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
const rows = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

describe('#createSchedule()', () => {
  let container;
  let tables;
  beforeEach(() => {
    global.window = createWindow();
    window.scheduler();
    container = window.document.getElementById('scheduler-container');
    tables = container.querySelectorAll('table');
  });
  afterEach(() => {
    delete global[window];
  });
  it('должна быть определена', () => {
    assert.exists(window.scheduler);
  });
  describe('TABLE', () => {
    it('должна создавать элементы table в "scheduler-container"', () => {
      tables.forEach((table) => {
        assert.exists(table);
      });
    });
    it('должна создавать элементы th c контентом из columns в thead', () => {
      tables.forEach((table, i) => {
        assert.equal(table.querySelectorAll('thead tr th')[1].textContent, columns[i]);
      });
    });
    it('должна создавать элементы th c контентом из rows в tbody', () => {
      tables.forEach((table, i) => {
        const ths = table.querySelectorAll('tbody tr th');
        assert.equal(ths[i].textContent, rows[i]);
      });
    });
  });
});
