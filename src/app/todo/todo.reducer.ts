import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';
import { Action } from '@ngrx/store';

// Definicion de valores iniciales
const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el mundo');


const estadoInicial: Todo[] = [todo1, todo2];

export function todoReducer(state = estadoInicial,
                            action: fromTodo.Acciones): Todo[] {
        switch(action.type) {
            case fromTodo.AGREGAR_TODO:
                const todo = new Todo(action.texto);
                // usamos una caracteristica de ECMS 6
                // clonamos todos los elementos del arraglo,
                // agregamos uno nuevo y retornamos un nuevo arreglo
                return [...state, todo];
            case fromTodo.TOOGLE_TODO:
                return state.map(todoEdit => {
                    if(todoEdit.id === action.id) {
                        return {
                            // para clonar todas las propiedades
                            // usamos el operador expred
                            // salvo las que yo explicitamente le diga un valor
                            // como es el caso de completado
                            ...todoEdit,
                            completado: !todoEdit.completado
                        };
                    } else {
                        return todoEdit;
                    }
                });
            case fromTodo.EDITAR_TODO:
                return state.map(todoEdit => {
                    if(todoEdit.id === action.id) {
                        return {
                            // para clonar todas las propiedades
                            // usamos el operador expred
                            // salvo las que yo explicitamente le diga un valor
                            // como es el caso de completado
                            ...todoEdit, texto: action.texto
                        };
                    } else {
                        return todoEdit;
                    }
                });
            case fromTodo.BORRAR_TODO:
                return state.filter( todoEdit => todoEdit.id !== action.id);
            case fromTodo.TOOGLE_ALL_TODO:
                return state.map(todoEdit => {
                    return { ...todoEdit, completado: action.completado };
                });
            case fromTodo.BORRAR_ALL_TODO:
                return state.filter( todoEdit => !todoEdit.completado);
            default:
                return state;
        }

}
