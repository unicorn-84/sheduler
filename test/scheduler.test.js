import checkOptions from '../src/checkOptions';

const { assert } = require('chai');
const createWindow = require('./setup');

describe('scheduler', () => {
  let window;
  beforeEach(() => {
    [, window] = createWindow();
  });
  it('scheduler должен быть функцией', () => {
    assert.isFunction(window.scheduler);
  });
});

describe('#checkOptions()', () => {
  it('должна бросить ошибку, если options не определен', () => {
    assert.throws(() => checkOptions(), 'scheduler.js: Отсутствует аргумент options у scheduler()');
  });
});
