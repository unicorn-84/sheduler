export default {
  breakpoint: '991px',
  container: 'scheduler-container',
  indexing: false,
  table: {
    attributes: {
      id: 'id',
      class: 'table table-bordered table-dark',
    },
    thead: {
      attributes: {
        class: 'thead',
      },
      tr: {
        attributes: {
          class: 'tr',
        },
      },
      th: {
        attributes: {
          class: 'th',
        },
      },
    },
    tbody: {
      attributes: {
        class: 'tbody',
      },
      tr: {
        attributes: {
          class: 'tr',
        },
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
        content: 'text',
      },
    },
    columns: {
      data: ['vlad', 'ivan', 'anna'],
      sort: false,
    },
    rows: {
      data: ['vue', 'polymer', 'react'],
      sort: false,
    },
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
