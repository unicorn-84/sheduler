import matchMediaPolyfill from 'mq-polyfill';
import { options } from '../../src/options';

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const production = process.env.NODE_ENV === 'production';
const scheduler = fs.readFileSync(path.join(__dirname, production ? '../../build/scheduler.min.js' : '../../dev/scheduler.js'), { encoding: 'utf-8' });

function createWindow() {
  const jsdom = new JSDOM(`<!doctype html><html><body><div id="${options.containerId}"></div></body></html>`, { runScripts: 'dangerously' });
  const { window } = jsdom;
  const scriptEl = window.document.createElement('script');
  scriptEl.textContent = scheduler;
  window.document.body.appendChild(scriptEl);
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
  global.window = window;
  global.document = window.document;
}

export default createWindow;
