import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  // servicio en donde validamos el usuario
  constructor(
    private storage: Storage
  ) { }

  async loginUser(credentials) {
   const user = await this.storage.get('user');
   return new Promise((accept, reject) => {
    if ( user.email == credentials.email && user.password == credentials.password) {
      accept('Login Correcto');
    } else {
      reject('Login incorrecto');
    }
   });
  }

  registrarUser(userData) {
    userData.password = btoa(userData.password);
    return this.storage.set('user', userData);
  }
}
