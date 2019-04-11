import { assert } from 'chai';
import _ from 'lodash';
import createWindow from './setup/setup';
import options from './options';

suite('#scheduler()', () => {
  let opts;
  let container;
  setup(() => {
    opts = _.defaultsDeep({}, options);
    createWindow();
    container = document.getElementById('scheduler-container');
  });
  test('должна бросить ошибку, если container не найден', () => {
    opts.container = 'bad-container';
    assert.throw(() => window.scheduler(opts), 'sheduler.js: container не найден');
  });
  test('должна удалять элементы из container', () => {
    const el = document.createElement('button');
    container.appendChild(el);
    window.scheduler(opts);
    assert.notExists(container.querySelector('button'));
  });
  test('должна добавлять элементы table в container', () => {
    window.scheduler(opts);
    assert.notEqual(container.getElementsByTagName('table').length, 0);
  });
  test('должна добавлять table в container, если viewport > breakpoint', () => {
    window.resizeTo(Number(opts.breakpoint.slice(0, -2)) + 1);
    window.scheduler(opts);
    assert.equal(container.getElementsByTagName('table').length, 1);
    window.resizeTo(1024);
  });
  test('должна добавлять tables в container, если viewport <= breakpoint', () => {
    window.resizeTo(Number(opts.breakpoint.slice(0, -2)));
    window.scheduler(opts);
    assert.equal(container.getElementsByTagName('table').length, 3);
    window.resizeTo(1024);
  });
  test('должна менять таблицы при смене размеров viewport', () => {
    window.scheduler(opts);
    assert.equal(container.getElementsByTagName('table').length, 1);
    window.resizeTo(540);
    assert.equal(container.getElementsByTagName('table').length, 3);
    window.resizeTo(1024);
  });
});
