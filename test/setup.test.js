import { assert } from 'chai';
import createWindow from './setup';

describe.skip('Тестирование настройки JSDOM для тестов', () => {
  beforeEach(() => {
    global.window = createWindow();
  });
  afterEach(() => {
    delete global[window];
  });
  it('должен быть определен window', () => {
    assert.exists(window);
  });
  it('должен быть определен sheduler', () => {
    assert.exists(window.scheduler);
  });
});
