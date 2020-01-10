import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService,
    public router: Router) { }

  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      console.log('PASÓ EL GUARD')
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('BLOQUEADO POR EL GUARD')
      return false;
    }
    return true;
  }
}
