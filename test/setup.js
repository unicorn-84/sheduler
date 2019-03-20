const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const _ = require('lodash');

const production = process.env.NODE_ENV === 'production';
const scheduler = fs.readFileSync(path.join(__dirname, production ? '../build/scheduler.min.js' : '../dev/scheduler.js'), { encoding: 'utf-8' });

function createWindow(string) {
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'dangerously' });
  const { window } = jsdom;
  const { document } = window;
  const { body } = document;
  const scriptEl = document.createElement('script');
  scriptEl.textContent = scheduler;
  body.appendChild(scriptEl);
  if (_.isString(string)) {
    body.insertAdjacentHTML('afterBegin', string);
  }
  return [jsdom, window, document, body];
}

module.exports = createWindow;
