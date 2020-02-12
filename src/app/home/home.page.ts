import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';

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
  // los servicios se encargan del manejo de los datos
  constructor(private musicService: PlatziMusicService) {}

  // ejecutamos lo que este aqui luego de que el usuario entre a la pagina y se ejecute el HTML
  ionViewDidEnter() {
    this.musicService.getNewReleases()
    .then(newReleases => {
      this.artists = this.musicService.getArtists();
      this.songs = newReleases.albums.items.filter(e => e.album_type == "single");
      this.albums = newReleases.albums.items.filter(e => e.album_type == 'album');
    });
  }
  

}
