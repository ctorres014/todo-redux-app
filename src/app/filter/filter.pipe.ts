import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/model/todo.model';

import * as fromFiltro from './filter.action';

@Pipe({
  name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {

  // Recibo como argumentos el array de Todo[]
  // y el filtro (completados, pendientes, etc)
  transform(todo: Todo[], filter: fromFiltro.filtrosValidos): Todo[] {
     switch(filter) {
      case 'completados':
        return todo.filter(x => x.completado);
      case 'pendientes':
        return todo.filter(x => !x.completado);
      default:
        return todo;
    }
    return todo;
  }

}
