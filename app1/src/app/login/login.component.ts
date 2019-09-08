import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit 
{
  public correo: string;
  public clave: string;

  constructor() 
  {
  	this.correo = '';
  	this.clave = '';
  }

  ngOnInit() {}

  public mostrarBoton(): boolean
  {
  	return (this.clave.trim().length > 0 && this.correo.trim().length > 0);
  }

}
