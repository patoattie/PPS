import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
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
  //private db: Firestore;
  //private usuarios: Usuario[];

  constructor() 
  {
  	this.correo = '';
  	this.clave = '';
/*  	this.db = new Firestore(
  		{
  			projectId: 'pps1-80161',
  			//keyFilename: '../../../platforms/android/app/google-services.json',
  			credentials: {client_email: 'patoattie@gmail.com', private_key: ''},
  		});
  	this.usuarios = new Array();
this.db.doc('Usuarios').get().then((querySnapshot) => 
{
	this.usuarios.push(new Usuario(querySnapshot.get('id'), querySnapshot.get('correo'), querySnapshot.get('clave'), querySnapshot.get('perfil'), querySnapshot.get('sexo')));
});*/

  }

  ngOnInit() {}

  public mostrarBoton(): boolean
  {
  	return (this.clave.trim().length > 0 && this.correo.trim().length > 0);
  }

}
