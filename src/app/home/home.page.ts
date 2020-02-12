import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  artists = [{}, {}, {}, {}, {}, {}, {}, {}];
  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  songs: any[] = [];
  albums: any[] = [];
  constructor(private musicService: PlatziMusicService) {}

  ionViewDidEnter() {
    this.musicService.getNewReleases()
    .then(newReleases => {
      this.artists = newReleases.albums.items;
      console.log(this.artists);
      this.songs = newReleases.albums.items.filter(e => e.type.contains('single'));
      console.log(this.songs);
      this.albums = newReleases.albums.items.filter(e => e.type == 'album');
    });
  }

}
