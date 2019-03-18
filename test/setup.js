const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const production = process.env.NODE_ENV === 'production';
const scheduler = fs.readFileSync(path.join(__dirname, production ? '../build/scheduler.min.js' : '../dev/scheduler.js'), { encoding: 'utf-8' });

function setupEnv() {
  const { window } = new JSDOM('', { runScripts: 'dangerously' });
  const scriptEl = window.document.createElement('script');
  scriptEl.textContent = scheduler;
  window.document.body.appendChild(scriptEl);
  return window;
}

module.exports = setupEnv;
