import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//import * as swal from 'sweetalert';
import swal from 'sweetalert';
//Servicios
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(param1: string, param2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[param1].value;
      let pass2 = group.controls[param2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });
  }

  registrarUsuario() {
    //Si la función sonIguales retorna sonIguales:false... return;
    if (this.forma.invalid) {
      return;
    }
    //Si condiciones no tiene nada
    if (!this.forma.value.condiciones) {
      swal("Importante", "Debe aceptar las condiciones", "warning");
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login']));
  }

}