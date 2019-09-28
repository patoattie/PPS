import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { LoginService } from 'src/app/servicios/login.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit 
{
  public usuarios: Usuario[];

  constructor(public authService: AuthService, public loginService: LoginService) 
  {
  }

  ngOnInit() 
  {
    if(this.authService.isLoggedIn())
    {
      this.loginService.getUsuarios().subscribe(
        usuarios => this.usuarios = usuarios,
        error => console.info(error)
      );
    }
  }

  public getDatoUsuario(atributo: string): string
  {
    let retorno: string = '';

    if(this.usuarios != undefined)
    {
      this.usuarios.forEach(unUsuario => 
      {
        if(unUsuario.correo == this.authService.getUserData().email)
        {
          switch(atributo)
          {
            case 'perfil':
              retorno = unUsuario.perfil;
              break;
            case 'sexo':
              retorno = unUsuario.sexo;
              break;
          }
        }
      });
    }

    return retorno;
  }

}
