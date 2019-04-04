const columns = ['Vlad', 'Ivan', 'Anna', 'Petr'];
const rows = ['Vue', 'Polymer', 'React'];
const events = [
  {
    column: 'Vlad',
    row: 'Polymer',
    content: '+',
  },
  {
    column: 'Vlad',
    row: 'Vue',
    content: '+',
  },
  {
    column: 'Anna',
    row: 'React',
    content: '+',
  },
];
const options = {
  breakpoint: 991,
  containerId: 'scheduler-container',
};
export {
  columns, rows, options, events,
};
