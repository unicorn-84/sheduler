const { assert } = require('chai');
const setupEnv = require('./setup');

describe('scheduler.js', () => {
  let window;
  beforeEach(() => {
    window = setupEnv();
  });
  it('должен быть свойством window', () => {
    assert.exists(window.scheduler);
  });
  it('должен быть функцией', () => {
    assert.isFunction(window.scheduler);
  });
});
