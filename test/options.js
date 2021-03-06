export default {
  breakpoint: null,
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
    },
  },
  disableEmptyTable: false,
  disableEmptyMobileTable: false,
  disableEmptyRow: false,
  disableEmptyMobileRow: false,
  disableThead: false,
  disableMobileThead: false,
  disableFirstColumn: false,
  disableFirstMobileColumn: false,
  columns: {
    data: ['vlad', 'ivan', 'anna'],
    sort: false,
  },
  rows: {
    data: ['vue', 'polymer', 'react'],
    sort: false,
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
