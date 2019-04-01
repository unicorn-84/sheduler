import { assert } from 'chai';
import createWindow from './setup/setup';

createWindow();

suite('SCHEDULER', () => {
  suite('#scheduler()', () => {
    test('должна добавлять элемент table в container', () => {
      window.scheduler();
      const container = document.getElementById('scheduler-container');
      assert.exists(container.querySelector('table'));
    });
  });
});
