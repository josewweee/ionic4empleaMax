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
  currentSong = {};
  newTime;
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

  async showArtistSongs(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    console.log(songs);
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

  async showAlbumSongs(album) {
    const songs = await this.musicService.getAlbumTracks(album.id);
    console.log(songs);
    // pasos para crear el modal
    const modal = await this.modalController.create({
      // pagina que abrira el modal
      component: SongsModalPage,
      // datos que le enviamos al modal
      componentProps: {
        songs: songs.items,
        artist: album.name
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
    // audio es una API que maneja sonidos
    /**this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();

    // tomamos el tiempo actual de la cancion
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
    });
    this.song.playing = true;**/
  }

  pause() {
   /** this.currentSong.pause();
    this.song.playing = false;**/
  }

  parseTime(time="0.00") {
    if(time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if(minutes.length == 1) {
        minutes = "0"+minutes;
      }

      let seconds = (partTime % 60).toString();
      if(seconds.length == 1) {
        seconds = "0"+seconds;
      }
      return minutes + ":" + seconds;
    }
  }
  

}
