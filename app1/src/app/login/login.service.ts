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
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
