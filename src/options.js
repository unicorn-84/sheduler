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
          disabled: true,
        },
        content: 'text',
      },
    },
    columns: ['vlad', 'ivan', 'anna'],
    rows: ['vue', 'polymer', 'react'],
  },
  events: [
    {
      attributes: {
        class: 'bg-dark',
        'data-column': 'anna',
      },
      column: 'anna',
      row: 'vue',
      content: '<i class="fas fa-meh fa-2x text-warning"></i>',
    },
  ],
};
export default options;
