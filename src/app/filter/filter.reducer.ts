import * as fromFiltro from './filter.action';

// Definimos el estado inicial
const estadoInicial: fromFiltro.filtrosValidos = 'todos';

// Creamos la funcion reducer
export function filtroReducer(state = estadoInicial,
                            action: fromFiltro.acciones): fromFiltro.filtrosValidos {
    switch(action.type) {
        case fromFiltro.SET_FILTRO:
            return action.filtro;
        default:
            return state;
    }
}