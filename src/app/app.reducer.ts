import { Todo } from './todo/model/todo.model';
import { ActionReducerMap } from '@ngrx/store';
// Importamos los reducers
import * as fromTodo from './todo/todo.reducer';
import * as fromFilter from './filter/filter.reducer';
// Importamos el filter action para poder hacer referencia
// al type definido, como tipo de filtro
import * as fomrFiltroAction from './filter/filter.action';

export interface AppState {
    todos: Todo[];
    filtro: fomrFiltroAction.filtrosValidos;
}

// Creamos la constante que vamos a utilizar en StoreModule.forRoot
export const appReducers: ActionReducerMap<AppState> = {
    todos: fromTodo.todoReducer,
    filtro: fromFilter.filtroReducer
}