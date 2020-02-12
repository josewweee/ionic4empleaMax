import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userImage = 'src/assets/img/user.jpg';

  // SafeResourceUrl nos sirve para tener una URL segura.
  photo: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  // temporalmente en main.ts tenemos fotos en navegador
  // instalando @ionic/pwa-elements
  // funcion para tomar fotos
  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // como codificamos el url, esta es la mas versatil pa pegarla en src.
      source: CameraSource.Camera  // puede ser de galeria o camara
    });
    // sanitizer nos deja la URL segura (investigar)
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    )
  }

}
