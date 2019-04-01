import { assert } from 'chai';
import createWindow from './setup';

createWindow();

suite.skip('TESTING ENV', () => {
  test('window должно быть определено', () => {
    assert.exists(window);
  });
  test('document должно быть определено', () => {
    assert.exists(document);
  });
  test('scheduler должно быть определено', () => {
    assert.exists(window.scheduler);
  });
  test('container должен быть в DOM', () => {
    window.scheduler();
    assert.exists(document.getElementById('scheduler-container'));
  });
});
