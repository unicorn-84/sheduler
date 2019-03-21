import isUndefined from 'lodash/isUndefined';

export default function checkOptions(options) {
  if (isUndefined(options)) {
    throw new Error('scheduler.js: Отсутствует аргумент options у scheduler()');
  }
}
