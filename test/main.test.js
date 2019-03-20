const { assert } = require('chai');
const createWindow = require('./setup');

describe('Sheduler', () => {
  describe('src/main.js', () => {
    let window;
    beforeEach(() => {
      [, window] = createWindow();
    });
    it('scheduler должен быть свойством window', () => {
      assert.exists(window.scheduler);
    });
    it('scheduler должен быть функцией', () => {
      assert.isFunction(window.scheduler);
    });
  });
});
