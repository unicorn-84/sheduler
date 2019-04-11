export default {
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
        removeEmpty: false,
      },
      th: {
        attributes: {
          class: 'th',
        },
        remove: false,
        removeMobile: false,
      },
      td: {
        attributes: {
          class: 'td',
        },
        content: '-',
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
      content: '+',
    },
  ],
};
