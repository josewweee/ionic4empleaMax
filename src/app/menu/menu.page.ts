import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menu: MenuController, private navCtrl: NavController, private storage: Storage) { }

  ngOnInit() {
  }

  closeMenu() {
    this.menu.close();
  }

  logOut() {
    this.storage.remove('isUserLoggedIn');
    this.navCtrl.navigateRoot('/login');
  }

  goToSettings() {
    this.navCtrl.navigateRoot('menu/settings');
  }

  goToHome() {
    this.navCtrl.navigateRoot('menu/home');
  }

  goToSports() {
    this.navCtrl.navigateRoot('menu/sports');
  }

}
