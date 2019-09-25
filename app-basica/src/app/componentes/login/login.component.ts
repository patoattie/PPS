import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Usuario } from '../../clases/usuario';
import { LoginService } from '../../servicios/login.service';
import { AuthService } from "../../servicios/auth.service";

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
  
  constructor(private loginService: LoginService, private formBuilder: FormBuilder, public authService: AuthService) 
  {
    this.formulario = this.formBuilder.group(
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

  private verificarUsuario(): boolean
  {
    let retorno: boolean = false;
//    this.usuarios.forEach(unUsuario =>
//    {
//      if(unUsuario.correo == this.formulario.value.correo && unUsuario.clave == this.formulario.value.clave)
//      {
//          retorno = true;
//      }
//    });
    /* Lo depreco
    this.authService.doLogin(this.formulario.value.correo, this.formulario.value.clave);

    retorno = this.authService.getUser().length > 0;

    if(retorno)
    {
      this.authService.doLogout();
    }
    */
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

  public async login(): Promise<void>
  {
    let usuarioValido: boolean;

    if(this.formulario.valid)
    {
      //usuarioValido = this.verificarUsuario(); //Lo depreco
      await this.authService.SignIn(this.formulario.value.correo, this.formulario.value.clave);
      usuarioValido = this.authService.isLoggedIn();
      this.error = !usuarioValido;
      this.ok = usuarioValido;
      this.errorDatos = false;
      if(usuarioValido)
      {
        this.authService.SignOut();
      }
    }
    else
    {
      this.error = false;
      this.ok = false;
      this.errorDatos = true;
    }
  }

}
