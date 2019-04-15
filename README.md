## sheduler
Создает HTML таблицу с данными  
>*size: 4 Kb*  
### Usage
```html
<script src="scheduler.min.js"></script>
<script>
  window.scheduler({
    container: 'container',
    columns: {
      data: ['Petr', 'Ivan'],
    },
    rows: {
      data: ['Polymer'],
      sort: true,
    },
    events: [
      {
        column: 'Anna',
        row: 'Vue',
        content: '<span>😃</span>',       
      },
      {
        column: 'Ivan',
        row: 'React',
        content: '<span>😕</span>',
      },
    ],
  });
</script>

// =>

<table>
  <thead>
    <tr>
      <td></td>
      <td>Petr</td>
      <td>Ivan</td>
      <td>Anna</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Polymer</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>React</td>
      <td></td>
      <td>
        <span>😕</span>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>Vue</td>
      <td></td>
      <td></td>
      <td>
        <span>😃</span>
      </td>
    </tr>
  </tbody>
</table>
```
## API
### schema
```text
{
  breakpoint: {String}
  container: {String}
  indexing: {Boolean}
  table: {
    attributes: {Object}
    thead: {
      attributes: {Object}
      tr: {
        attributes: {Object}
      }
      td: {
        attributes: {Object}
      }
    }
    tbody: {
      attributes: {Object}
      tr: {
        attributes: {Object}
      }  
      td: {
        attributes: {Object}
        content: {String}
      }
    }
  }
  disableEmptyTable: {Boolean},
  disableEmptyMobileTable: {Boolean},
  disableEmptyRow: {Boolean},
  disableEmptyMobileRow: {Boolean},
  disableThead: {Boolean},
  disableMobileThead: {Boolean},
  disableFirstColumn: {Boolean},
  disableFirstMobileColumn: {Boolean},
  columns: {
    data: {Array}
    sort: {Boolean}
  }
  rows: {
    data: {Array}
    sort: {Boolean}
  }
  events: [
    {
      column: {String}
      row: {String}
      content: {String}
      attributes: {Object}
    }
    ...
  ]
}
```
### scheduler(options)
#### options
Type: `Object`
#### breakpoint
Type: `String`  
Default: `null`     
При ширине viewport браузера <= указанного значения таблица будет отображаться в мобильном режиме 
#### container
Type: `String`  
Default: `null`  
id элемента-родителя для таблицы
#### indexing
*для мобильной версии*  
Type: `Boolean`  
Default: `false`  
Добавляет аттрибут `data-index`    
#### attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента
#### disableEmptyTable
Type: `Boolean`  
Default: `false`  
Не создавать таблицы без событий
#### disableEmptyMobileTable
*для мобильной версии* 
Type: `Boolean`  
Default: `false`    
Не создавать таблицы без событий
#### disableEmptyRow
Type: `Boolean`  
Default: `false`  
Не создавать строки без событий
#### disableEmptyMobileRow
*для мобильной версии*  
Type: `Boolean`  
Default: `false`  
Не создавать строки без событий
#### disableThead
Type: `Boolean`  
Default: `false`  
Не создавать thead
#### disableMobileThead
*для мобильной версии*
Type: `Boolean`  
Default: `false`    
Не создавать thead
#### disableFirstColumn
Type: `Boolean`  
Default: `false`  
Не создавать первую колонку
#### disableFirstMobileColumn
*для мобильной версии*
Type: `Boolean`  
Default: `false`    
Не создавать первую колонку
#### content
Type: `String`  
Default: `undefined`  
HTML строка для элементов `td` 
#### data
Type: `Array`  
Default: `[]`  
Массив строк
#### sort 
Type: `Boolean`  
Default: `false`  
Отображать в отсортированном виде
#### events
Type: `Array`  
Default: `[]`  
Массив объектов событий
## Mobile version
Если breakpoint определено, тогда при browser viewport width <= breakpoint, из каждой колонки будет создана отдельная таблица
```html
<div id="scheduler-container"></div>
<script src="scheduler.min.js"></script>
<script>
  window.scheduler({
    breakpoint: '767px',
    container: 'container',
    indexing: true,
    table: {
      columns: {
        data: ['Petr', 'Ivan'],
      },
      rows: {
        data: ['Polymer'],
      },
    },
    events: [
      {
        column: 'Anna',
        row: 'Vue',
        content: '<span>😃</span>',       
      },
      {
        column: 'Ivan',
        row: 'React',
        content: '<span>😕</span>',
      },
    ],
  });
</script>

//=> 
browser viewport width <= '767px'

<table data-index="0">
  <thead>
    <tr>
      <td></td>
      <td>Petr</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Polymer</td>
      <td></td>
    </tr>
    <tr>
      <td>Vue</td>
      <td></td>
    </tr>
    <tr>
      <td>React</td>
      <td></td>
    </tr>
  </tbody>
</table>

<table data-index="1">
  <thead>
  <tr>
    <td></td>
    <td>Ivan</td>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>Polymer</td>
      <td></td>
    </tr>
    <tr>
      <td>Vue</td>
      <td></td>
    </tr>
    <tr>
      <td>React</td>
      <td><span>😕</span></td>
    </tr>
  </tbody>
</table>

<table data-index="2">
  <thead>
    <tr>
      <td></td>
      <td>Anna</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Polymer</td>
      <td></td>
    </tr>
    <tr>
      <td>Vue</td>
      <td><span>😃</span></td>
    </tr>
    <tr>
      <td>React</td>
      <td></td>
    </tr>
  </tbody>
</table>
```
### [Examples](https://github.com/unicorn-84/sheduler/tree/master/examples)
