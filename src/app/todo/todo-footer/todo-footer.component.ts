import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.action';
import * as fromTodo from '../todo.actions';
import { AppState } from '../../app.reducer';
// Model
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {
  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;
  pendientes: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
    });
  }

  cambiarFiltro(filtro: fromFiltro.filtrosValidos) {
    const accion = new fromFiltro.SetFiltroAction(filtro);
    this.store.dispatch(accion);
  }
  borrarTodo() {
    const accion = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch(accion);
  }
  private contarPendientes(todo: Todo[]) {
    this.pendientes = todo.filter(x => !x.completado).length;
  }
}
