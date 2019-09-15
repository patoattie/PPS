import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Usuario } from 'src/app/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService 
{
  private usuarios: Observable<Usuario[]>;
  private usuarioCollection: AngularFirestoreCollection<Usuario>;

  constructor(private afs: AngularFirestore) 
  { 
    this.usuarioCollection = this.afs.collection<Usuario>('Usuarios');
    this.usuarios = this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idCollection = a.payload.doc.id;
          return { idCollection, ...data };
        });
      })
    );
  }

  getUsuarios(): Observable<Usuario[]> 
  {
    return this.usuarios;
  }
 
  getUsuario(idCollection: string): Observable<Usuario> 
  {
    return this.usuarioCollection.doc<Usuario>(idCollection).valueChanges().pipe(
      take(1),
      map(usuario => {
        usuario.idCollection = idCollection;
        return usuario
      })
    );
  }

  addUsuario(usuario: Usuario): Promise<DocumentReference> 
  {
    return this.usuarioCollection.add(usuario);
  }
 
  updateUsuario(usuario: Usuario): Promise<void> 
  {
    return this.usuarioCollection.doc(usuario.idCollection).update({ id: usuario.id, correo: usuario.correo, clave: usuario.clave, perfil: usuario.perfil, sexo: usuario.sexo });
  }
 
  deleteUsuario(idCollection: string): Promise<void> 
  {
    return this.usuarioCollection.doc(idCollection).delete();
  }
}
