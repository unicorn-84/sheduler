const { assert } = require('chai');
const _ = require('lodash');
const createWindow = require('./setup');

describe('Тестирование настройки JSDOM для тестов', () => {
  describe('test/setup.js', () => {
    let jsdom;
    let window;
    let document;
    let body;
    beforeEach(() => {
      [jsdom, window, document, body] = createWindow();
    });
    it('должен экспортировать jsdom', () => {
      assert.exists(jsdom);
    });
    it('должен экспортировать window', () => {
      assert.exists(window);
    });
    it('должен экспортировать document', () => {
      assert.exists(document);
    });
    it('должен экспортировать body', () => {
      assert.exists(body);
    });
    it('body должен быть DOM элемент', () => {
      assert.isTrue(_.isElement(document.getElementsByTagName('body')[0]));
    });
    it('должен быть определен sheduler', () => {
      assert.exists(window.scheduler);
    });
    it('должен добавлять html строку в body', () => {
      [jsdom, window, document, body] = createWindow('<div class="container"></div>');
      const container = document.querySelector('.container');
      assert.isTrue(_.isElement(container));
    });
  });
});
