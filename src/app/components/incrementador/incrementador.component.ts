import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', { static: true }) txtProgress: ElementRef;

  //Parámetro 'nombre' es opcional para cambiarle el nombre al elemento en el html
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onChanges(newValue: number) {
    //Ahora esto se hace con el ViewChild
    // let elemHtml: any = document.getElementsByName('progreso')[0];
    // console.log(this.txtProgress)

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHtml.value = this.progreso
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(param: number) {
    if (this.progreso >= 100 && param > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && param < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + param;
    this.cambioValor.emit(this.progreso)
    this.txtProgress.nativeElement.focus();
  }

}
