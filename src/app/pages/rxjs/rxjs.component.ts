import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
      //Subscriptor recibe 3 callbacks: 1:lo que emite el next(), 2:un error(), 3:() cuando se ejecuta el complete() osea cuando termina de emitir el observador
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.error('Error en el obs', error),
        () => console.log('El observador terminó')
      );
  }

  ngOnInit() {
  }

  //Se ejecuta cuando se cambia a otra página (componente)
  ngOnDestroy(){
    console.log('la pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {

        contador++;

        const salida = {
          valor: contador
        }
        //Operador next notifica un valor al subscriptor
        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador == 2) {
        //   //clearInterval(intervalo);
        //   observer.error('Auxilio!')
        // }
      }, 1000);
    }).pipe(
      //Operador map transforma la data recibida en lo que queramos
      map(resp => resp.valor),
      filter((valor, index) => {
        if ((valor % 2) === 1) {
          //impar
          return true;
        } else {
          return false
        }
      })
    );
  }

}
