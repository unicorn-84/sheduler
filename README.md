## sheduler
Создает HTML таблицу с данными  
>*size: 4 Kb*  
### Usage
```html
<div id="scheduler-container"></div>
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
        content: '<h3>😃</h3>',       
      },
      {
        column: 'Ivan',
        row: 'React',
        content: '<h3>😕</h3>',
      },
    ],
  });
</script>

// =>

<div id="scheduler-container">
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
          <h3>😃</h3>
        </td>
      </tr>
      <tr>
        <th>React</th>
        <td></td>
        <td>
          <h3>😕</h3>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>
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
Отображать в отсортированном виде
#### events
Type: `Array`  
Default: `[]`  
Массив объектов событий
