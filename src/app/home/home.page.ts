import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];
  song = {};
  // los servicios se encargan del manejo de los datos
  constructor(
    private musicService: PlatziMusicService,
    private modalController: ModalController
    ) {}

  // ejecutamos lo que este aqui luego de que el usuario entre a la pagina y se ejecute el HTML
  ionViewDidEnter() {
    this.musicService.getNewReleases()
    .then(newReleases => {
      this.artists = this.musicService.getArtists();
      this.songs = newReleases.albums.items.filter(e => e.album_type == "single");
      this.albums = newReleases.albums.items.filter(e => e.album_type == 'album');
    });
  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    // pasos para crear el modal
    const modal = await this.modalController.create({
      // pagina que abrira el modal
      component: SongsModalPage,
      // datos que le enviamos al modal
      componentProps: {
        songs: songs.tracks,
        artist: artist.name
      }
    });

    // esto se ejecuta cuando se cierra el modal
    modal.onDidDismiss()
    .then(dataReturned => {
      this.song = dataReturned.data;
    });

    // para abrir el modal
    return await modal.present();
  }

  play() {
    this.song.playing = true;
  }

  pause() {
    this.song.playing = false;
  }
  

}
