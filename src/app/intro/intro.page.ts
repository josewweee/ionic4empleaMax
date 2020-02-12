import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  //configuracion slides
  slideOpts = {
    initialSlide: 0,
    slidePerView: 1,
    centeredSlides: true,
    speed: 400
  };


  slides = [{
    title: 'Bienvenido a empleaMAX',
    subTitle:"sub titulo",
    description:"puedes encontrar la descripcion aqui",
    icon: "play"
  }, {
    title: 'Bienvenido a empleaMAX',
    subTitle:"sub titulo",
    description:"puedes encontrar la descripcion aqui",
    icon: "play"
  }, {
    title: 'Bienvenido a empleaMAX',
    subTitle:"sub titulo",
    description:"puedes encontrar la descripcion aqui",
    icon: "play"
  }]

  constructor(private router: Router, private storage: Storage) { }

  finish() {
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl("/home");
  }

  ngOnInit() {
  }

}
