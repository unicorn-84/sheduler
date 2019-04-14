export default {
  breakpoint: undefined,
  container: 'scheduler-container',
  indexing: false,
  table: {
    attributes: {
      id: 'id',
      class: 'table table-bordered table-dark',
    },
    thead: {
      disable: false,
      disableMobile: false,
      attributes: {
        class: 'thead',
      },
      tr: {
        attributes: {
          class: 'tr',
        },
      },
      td: {
        attributes: {
          class: 'td',
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
      td: {
        attributes: {
          class: 'td',
        },
        content: '-',
      },
      disableEmptyRows: false,
      disableEmptyRowsMobile: false,
    },
    columns: {
      data: ['vlad', 'ivan', 'anna'],
    },
    rows: {
      data: ['vue', 'polymer', 'react'],
      sort: false,
    },
    disableEmpty: false,
    disableEmptyMobile: false,
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
