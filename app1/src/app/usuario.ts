import { EPerfil } from './eperfil.enum';
import { ESexo } from './esexo.enum';

export class Usuario 
{
	public idCollection: string;
	public id: number;
	public correo: string;
	public clave: string;
	public perfil: EPerfil;
	public sexo: ESexo;
	//public ok: boolean;
	//public error: boolean;

	constructor(id?: number, correo?: string, clave?: string, perfil?: EPerfil, sexo?: ESexo)
	{
		this.id = id;
		this.correo = correo;
		this.clave = clave;
		this.perfil = perfil;
		this.sexo = sexo;
		//this.error = false;
		//this.ok = false;
	}

	/*public esIgual(correo: string, clave: string): boolean
	{
		return (this.correo == correo && this.clave == clave);
	}*/
}
