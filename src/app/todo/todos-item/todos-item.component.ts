import { EditarTodoAction, BorrarTodoAction } from './../todo.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducer';
import { ToogleTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styles: []
})
export class TodosItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  chkField: FormControl;
  txtImput: FormControl;

  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // Inicializamos los controles
    this.chkField = new FormControl(this.todo.completado);
    this.txtImput = new FormControl(this.todo.texto, Validators.required);

    this.chkField.valueChanges.subscribe( () => {
      const accion = new ToogleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });
  }

  editar() {
    this.editando = true;
    // El timeout se presenta porque el foco se pone antes
    // de que se evalue el editando
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
    if(this.txtImput.invalid) {
      return;
    }
    if(this.txtImput.value === this.todo.texto) {
      return;
    }
    const accion = new EditarTodoAction(this.todo.id, this.txtImput.value);
    this.store.dispatch(accion);
  }

  borrarTodo() {
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }


}
