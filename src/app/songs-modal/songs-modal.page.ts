import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {

  songs: any[];
  artist: string

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ionViewDidEnter() {
    // navParams me permite tomar los datos con que invocaron este componente
    this.songs = this.navParams.data.songs;
    console.log(this.navParams);
    this.artist = this.navParams.data.artist
  }

  async selectSong(song) {
    // dismiss envia al componente que lo invoco parametros
    await this.modalController.dismiss(song);
  }
}
