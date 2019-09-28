import { EPerfil } from '../enums/eperfil.enum';
import { ESexo } from '../enums/esexo.enum';

export class Usuario 
{
	public idCollection: string;
	public id: number;
	public correo: string;
	public perfil: EPerfil;
	public sexo: ESexo;

	constructor(id?: number, correo?: string, perfil?: EPerfil, sexo?: ESexo)
	{
		this.id = id;
		this.correo = correo;
		this.perfil = perfil;
		this.sexo = sexo;
	}
}
