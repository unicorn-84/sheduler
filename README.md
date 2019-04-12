## sheduler
Создает HTML таблицу с данными  
>*size: 4 Kb*  
### Usage
```html
<script src="scheduler.min.js"></script>
<script>
  window.scheduler({
    container: 'scheduler-container',
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

// =>

<table>
  <thead>
    <tr>
      <th></th>
      <th>Petr</th>
      <th>Ivan</th>
      <th>Anna</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Polymer</th>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Vue</th>
      <td></td>
      <td></td>
      <td>
        <span>😃</span>
      </td>
    </tr>
    <tr>
      <th>React</th>
      <td></td>
      <td>
        <span>😕</span>
      </td>
      <td></td>
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
      th: {
        attributes: {Object}
      }
    }
    tbody: {
      attributes: {Object}
      tr: {
        attributes: {Object}
        removeEmpty: {Boolean}
        removeEmptyMobile: {Boolean}
      }
      th: {
        attributes: {Object}
        remove: {Boolean}
        removeMobile: {Boolean}
      }
      td: {
        attributes: {Object}
        content: {String}
      }
    }
    columns: {
      data: {Array}
      sort: {Boolean}
    }
    rows: {
      data: {Array}
      sort: {Boolean}
    }
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
Default: `undefined`     
При ширине viewport браузера <= указанного значения таблица будет отображаться в мобильном режиме 
#### container
Type: `String`  
Default: `scheduler-container`  
id элемента-родителя для таблицы
#### indexing  
Type: `Boolean`  
Default: `false`  
*только для мобильной версии*   
Добавляет аттрибут `data-index`    
#### attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента
#### removeEmpty
Type: `Boolean`  
Default: `false`  
Не создавать строки без событий
#### removeEmptyMobile
Type: `Boolean`  
Default: `false`  
*только для мобильной версии*  
Не создавать строки без событий
#### remove
Type: `Boolean`  
Default: `false`  
Не создавать заголовок строки
#### removeMobile
Type: `Boolean`  
Default: `false`  
*только для мобильной версии*  
Не создавать заголовок строки
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
      <th></th>
      <th>Petr</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Polymer</th>
      <td></td>
    </tr>
    <tr>
      <th>Vue</th>
      <td></td>
    </tr>
    <tr>
      <th>React</th>
      <td></td>
    </tr>
  </tbody>
</table>

<table data-index="1">
  <thead>
  <tr>
    <th></th>
    <th>Ivan</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <th>Polymer</th>
      <td></td>
    </tr>
    <tr>
      <th>Vue</th>
      <td></td>
    </tr>
    <tr>
      <th>React</th>
      <td><span>😕</span></td>
    </tr>
  </tbody>
</table>

<table data-index="2">
  <thead>
    <tr>
      <th></th>
      <th>Anna</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Polymer</th>
      <td></td>
    </tr>
    <tr>
      <th>Vue</th>
      <td><span>😃</span></td>
    </tr>
    <tr>
      <th>React</th>
      <td></td>
    </tr>
  </tbody>
</table>
```
## [Examples](https://github.com/unicorn-84/sheduler/tree/master/examples)
