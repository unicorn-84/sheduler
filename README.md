## sheduler
>Создает HTML таблицу с данными  
*size ~ 4 Kb*  
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
#### table
Type: `Object`     
#### table.attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента `table`
#### table.removeEmptyMobile
Type: `Boolean`  
Default: `false`  
*только для мобильной версии*  
Не отображать таблицы без событий
#### table.thead
Type: `Object`  
#### table.thead.attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента `thead`
#### table.thead.tr
Type: `Object`  
#### table.thead.tr.attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента `tr` в `thead`
#### table.thead.th
Type: `Object`  
#### table.thead.th.attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента `th` в `thead` 
#### table.tbody
Type: `Object`  
#### table.tbody.attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента `tbody` 
#### table.tbody.tr
Type: `Object`  
#### table.tbody.tr.attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента `tr` в `tbody`
#### table.tbody.tr.removeEmpty
Type: `Boolean`  
Default: `false`  
Не создавать строки без событий
#### table.tbody.tr.removeEmptyMobile
Type: `Boolean`  
Default: `false`  
*только для мобильной версии*  
Не создавать строки без событий
#### table.tbody.th
Type: `Boolean`  
#### table.tbody.th.attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента `th` в `tbody` 
#### table.tbody.th.remove
Type: `Boolean`  
Default: `false`  
Не создавать заголовок строки
#### table.tbody.th.removeMobile
Type: `Boolean`  
Default: `false`  
*только для мобильной версии*  
Не создавать заголовок строки
#### table.tbody.td
Type: `Boolean`  
#### table.tbody.td.attributes
Type: `Object`  
Default: `{}`  
HTML аттрибуты для элемента `td`
#### table.tbody.td.content
Type: `String`  
Default: `undefined`  
HTML строка для элементов `td`
#### table.columns
Type: `Object`  
#### table.columns.data
Type: `Array`  
Default: `[]`  
Массив значений заголовков колонок
#### table.columns.sort
Type: `Boolean`  
Default: `false`  
Отображать колонки в отсортированном виде
#### table.rows
Type: `Object`  
#### table.rows.data
Type: `Array`  
Default: `[]`  
Массив значений заголовков строк
#### table.rows.sort
Type: `Boolean`  
Default: `false`  
Отображать строки в отсортированном виде
#### events
Type: `Array`  
Default: `[]`  
Массив объектов событий
