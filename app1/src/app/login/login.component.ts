import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Usuario } from '../usuario';
import { LoginService } from './login.service';
//import { Firestore } from '@google-cloud/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit 
{
  public correo: string;
  public clave: string;
  public error: boolean;
  private usuarios: Observable<Usuario[]>;

  constructor(private loginService: LoginService) 
  {
  	this.correo = '';
  	this.clave = '';
    this.error = false;
  }

  ngOnInit() 
  {
    this.usuarios = this.loginService.getUsuarios();
  }

  public mostrarBoton(): boolean
  {
  	return (this.clave.trim().length > 0 && this.correo.trim().length > 0);
  }

  public verificarUsuario(): boolean
  {
    let retorno: boolean = false;

    this.usuarios.forEach(usuarios =>
    {
      usuarios.forEach(unUsuario =>
      {
        console.info(unUsuario);
        if(Usuario.esIgual(unUsuario, this.correo, this.clave))
        {
          retorno = true;
        }
      });
    });

  this.error = !retorno;

  return retorno;
  }

}
