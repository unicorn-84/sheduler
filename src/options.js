const events = [
  {
    column: 'Vlad',
    row: 'Polymer',
    content: '<i class="far fa-frown fa-2x"></i>',
  },
  {
    column: 'Vlad',
    row: 'Vue',
    content: '<i class="far fa-smile fa-2x"></i>',
  },
  {
    column: 'Anna',
    row: 'React',
    content: '<i class="far fa-meh fa-2x"></i>',
  },
  {
    column: 'Anna',
    row: 'Polymer',
    content: 'Hello',
  },
  {
    column: 'Суббота',
    row: 'React',
    content: '<div class="event"><h4>Stretching</h4><p>Иван Иванов</p></div>',
  },
];
const options = {
  breakpoint: 991,
  container: 'scheduler-container',
  table: {
    attributes: {
      class: 'table table-bordered table-dark',
      disabled: false,
    },
    thead: {
      attributes: {
        class: 'thead',
      },
      th: {
        class: 'th',
      },
    },
    tbody: {
      attributes: {
        class: 'tbody',
      },
      th: {
        attributes: {
          class: 'th',
        },
      },
      td: {
        attributes: {
          class: 'td',
        },
        content: null,
      },
    },
    columns: ['Vlad', 'Ivan', 'Anna', 'Суббота'],
    rows: ['Vue', 'Polymer', 'React'],
  },
  events,
};
export default options;
