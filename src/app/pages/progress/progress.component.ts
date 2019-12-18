import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  progreso1: number = 30;
  progreso2: number = 60;

  constructor() { }

  ngOnInit() {
  }
  //Función se puede reducir a poner progreso1 = $event en HTML
  // actualizar(event:number){
  //   console.log(event)
  // }

}
