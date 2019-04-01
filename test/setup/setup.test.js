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
  test('matchMedia должно быть определено', () => {
    assert.exists(window.matchMedia);
  });
  test('resizeTo должно быть определено', () => {
    assert.exists(window.resizeTo);
  });
  test('resizeTo() должна изменять viewport', () => {
    window.resizeTo(991);
    assert.equal(window.innerWidth, 991);
    window.resizeTo(575);
    assert.equal(window.innerWidth, 575);
  });
});
