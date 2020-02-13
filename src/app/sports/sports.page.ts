import { Component, OnInit } from '@angular/core';
// para usar la geoposicion
import { Plugins } from '@capacitor/core'; 
import { PlatziMusicService } from '../services/platzi-music.service';
const {Geolocation} = Plugins // const Geolocation = plugins.geolocation
//imports geoposicion

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage {

  currentCenter: any;
  coordinates: any[] = [];
  defaultZoom = 14;
  searchTerm: any;
  songs: any[] = [];
  currentSong: any;
  constructor(private musicService: PlatziMusicService) { }

  // Invocamos estas funciones cuando se pinte el HTML
  ionViewDidEnter() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  // tomamos la posicion inicial del usuario
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }
  }
  // miramos cuando el usuario cambia de posicion
  watchPosition() {
    Geolocation.watchPosition({}, position =>{
      this.currentCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // guardamos la las posiciones donde l usuario ha estado para tener traking de su path
      this.coordinates.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }

  // buscador de canciones 
  async searchSongs() {
    if(this.searchTerm){
      const response = await this.musicService.searchTracks(this.searchTerm);
      this.songs = response.tracks.items.filter(e => e.preview_url)
      console.log(this.songs);
    }else{
      this.songs = []
    }
  }

  // sonamos una cancion y detenemos la anterior que estaba sonando
  play(song){
    // pausamos la cancion
    if(this.currentSong){
      this.currentSong.pause();
    }

    // le ponemos false el atributo playing en el arreglo, para cambiar al icono de "pausar"
    const temporalSong = this.songs.filter(e => e.playing);
    if (temporalSong[0]) {
      temporalSong[0].playing = false;
    }

    //le damos play
    song.playing = true;
    this.currentSong = new Audio(song.preview_url);
    this.currentSong.play();
  }

  pause(song) {
    song.playing = false;
    this.currentSong.pause();
  }
    
}
