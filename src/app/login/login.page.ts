import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  // mensajes de error en caso de que se ponga mal los datos
  validationMessage = {
    email: [
      {type: 'required', message: 'el email es requerido'},
      {type: 'pattern', message: 'Ojo!, este no es un email valido'}
    ],
    password: [
      {type: 'required', message: 'el password es requerido'},
      {type: 'min', message: 'Minimo 5 letras para el password'}
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
    this.loginForm = this.formBuilder.group({
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
      )
    });

   }

  ngOnInit() {
  }

  // inventamos un servicio que hace las de backend
  loginUser(credentials) {
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = '';
      this.storage.set('isUserLoggedIn', true);
      // navegacion diferente
      this.navCtrl.navigateForward('/menu/home');
    })
    .catch(err => {
      this.errorMessage = err;
    });
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

}
