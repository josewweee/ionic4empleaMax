import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;

  // mensajes de error en caso de que se ponga mal los datos
  validationMessage = {
    email: [
      {type: 'required', message: 'el email es requerido'},
      {type: 'pattern', message: 'Ojo!, este no es un email valido'}
    ],
    password: [
      {type: 'required', message: 'el password es requerido'},
      {type: 'min', message: 'Minimo 5 letras para el password'}
    ],
    nombre: [
      {type: 'required', message: 'el nombre es requerido'}
    ],
    apellido: [
      {type: 'required', message: 'el apellido es requerido'}
    ]
  };
  errorMessage: String = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticateService, 
    private navCtrl: NavController, 
    private storage: Storage
  ) {

    // El Form se usara para validar con colores mientras el usuario escribe
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          // Validators.email   ESTO es lo mismo de la linea de arriba
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ),
      nombre: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      apellido: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      )

    });

   }

   register(userData) {
    this.authService.registrarUser(userData)
    .then(() => {
      this.navCtrl.navigateBack('/login');
    });
   }

   goToLogin() {
     this.navCtrl.navigateBack('/login');
   }

}
