import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    //si el mail del localStorage viene undefined, lo dejará ''
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }
  //Por defecto, sólo cambia el client_id
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '548243853342-n7adcr2dtcve3p33adiejv4rh3mged97.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'))
    });
  }
  //Por defecto
  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      //Obtenemos el token de la auth de google
      let token = googleUser.getAuthResponse().id_token
      this._usuarioService.loginGoogle(token)
        //correcto es el true que retorna el servicio
        .subscribe(correcto => window.location.href = '#/dashboard');
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password)

    this._usuarioService.login(usuario, forma.value.recuerdame)
      //correcto es el true que retorna el servicio
      .subscribe(correcto => this.router.navigate(['/dashboard']));
  }

}
