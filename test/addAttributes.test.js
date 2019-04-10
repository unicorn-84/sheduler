import { assert } from 'chai';
import addAttributes from '../src/addAttributes';
import createWindow from './setup/setup';

suite('#addAttributes()', () => {
  setup(() => {
    createWindow();
  });
  test('должна добавлять аттрибуты к элементу', () => {
    let el = document.createElement('button');
    el = addAttributes(el, { class: 'smth', disabled: '', 'data-smth': null });
    assert.equal(el.outerHTML, '<button class="smth" disabled="" data-smth="null"></button>');
  });
  test('должна добавлять значения к аттрибуту class', () => {
    let el = document.createElement('button');
    el.className = 'foo';
    el = addAttributes(el, { class: 'smth', disabled: '', 'data-smth': null });
    assert.equal(el.outerHTML, '<button class="foo smth" disabled="" data-smth="null"></button>');
  });
});
