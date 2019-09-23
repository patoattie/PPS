import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Usuario } from '../../clases/usuario';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit 
{
  public ok: boolean;
  public error: boolean;
  private formulario: FormGroup;
  private usuarios: Usuario[];
  public errorDatos: boolean;
  
  constructor(private loginService: LoginService, formBuilder: FormBuilder) 
  {
    this.formulario = formBuilder.group(
      {
        correo: ['', Validators.compose([Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"), Validators.required])],
        clave: ['', Validators.compose([Validators.minLength(4), Validators.required])]
      });
  }

  ngOnInit() 
  {
    this.ok = false;
    this.error = false;
    this.errorDatos = false;
    this.loginService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios,
      error => console.info(error)
    );
  }

  /*public mostrarBoton(): boolean
  {
  	return (this.clave.trim().length > 0 && this.correo.trim().length > 0);
  }*/

  private verificarUsuario(): boolean
  {
    let retorno: boolean = false;
    this.usuarios.forEach(unUsuario =>
    {
      if(unUsuario.correo == this.formulario.value.correo && unUsuario.clave == this.formulario.value.clave)
      {
          retorno = true;
      }
    });

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

  public login(): void
  {
    let usuarioValido: boolean;

    if(this.formulario.valid)
    {
      usuarioValido = this.verificarUsuario();
      this.error = !usuarioValido;
      this.ok = usuarioValido;
      this.errorDatos = false;
    }
    else
    {
      this.error = false;
      this.ok = false;
      this.errorDatos = true;
    }
  }

}
