import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Usuario } from '../usuario';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit 
{
  public correo: string;
  public clave: string;
  public ok: boolean;
  public error: boolean;
  private usuarios: Usuario[];

  constructor(private loginService: LoginService) { }

  ngOnInit() 
  {
    this.correo = '';
    this.clave = '';
    this.ok = false;
    this.error = false;
    this.loginService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios,
      error => console.info(error)
    );
  }

  public mostrarBoton(): boolean
  {
  	return (this.clave.trim().length > 0 && this.correo.trim().length > 0);
  }

  public verificarUsuario(): boolean
  {
    let retorno: boolean = false;
    this.usuarios.forEach(unUsuario =>
    {
      if(unUsuario.correo == this.correo && unUsuario.clave == this.clave)
      {
          retorno = true;
      }
    });

    this.error = !(retorno);
    this.ok = retorno;

    return retorno;
  }

  public getOk(): boolean
  {
    return this.ok;
  }

  public getError(): boolean
  {
    return this.error;
  }

}
