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
  }

  ngOnInit() 
  {
    this.correo = '';
    this.clave = '';
    this.error;// = false;
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
        console.info(this.correo);
        console.info(this.clave);
        console.info(retorno);
        console.info(this.error);
        //if(unUsuario.esIgual(this.correo, this.clave))
        if(unUsuario.correo == this.correo && unUsuario.clave == this.clave)
        {
          retorno = true;
        }
      });
    });

    this.error = !(retorno);

    return retorno;
  }

  public getError(): boolean
  {
    return this.error;
  }

}
