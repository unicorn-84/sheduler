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
    columns: {
      data: ['vlad', 'ivan', 'anna'],
    },
    rows: {
      data: ['vue', 'polymer', 'react'],
      sort: false,
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
