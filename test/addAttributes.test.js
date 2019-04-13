import { assert } from 'chai';
import addAttributes from '../src/addAttributes';
import createWindow from './setup/setup';

suite('#addAttributes()', () => {
  setup(() => {
    createWindow();
  });
  test('должна добавлять аттрибуты к элементу', () => {
    let el = document.createElement('button');
    el = addAttributes(el, { class: 'smth', disabled: '', 'data-smth': 'string' });
    assert.equal(el.outerHTML, '<button class="smth" disabled="" data-smth="string"></button>');
  });
  test('должна добавлять значения к аттрибуту class', () => {
    let el = document.createElement('button');
    el.className = 'foo';
    el = addAttributes(el, { class: 'smth', disabled: '', 'data-smth': 'string' });
    assert.equal(el.outerHTML, '<button class="foo smth" disabled="" data-smth="string"></button>');
  });
  test('не должна добавлять null значения', () => {
    let el = document.createElement('button');
    el.className = 'foo';
    el = addAttributes(el, { class: 'smth', 'data-smth': null });
    assert.equal(el.outerHTML, '<button class="foo smth"></button>');
  });
  test('должна добавлять аттрибуты к parent', () => {
    const table = document.createElement('table');
    const row = table.insertRow(0);
    const cell = row.insertCell(0);
    addAttributes(cell, { class: 'child' }, [
      { selector: 'table', attributes: { class: 'has-td' } },
      { selector: 'tr', attributes: { class: 'has-td' } },
    ]);
    assert.equal(table.outerHTML, '<table class="has-td"><tbody><tr class="has-td"><td class="child"></td></tr></tbody></table>');
  });
});
