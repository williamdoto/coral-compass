import { Component } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeInOut' , [
      state('void', style({opacity: 0})),
      transition('void <=> *', animate(1000)),
    ])
  ]
})

export class DashboardComponent{
  ImageOne = "assets/images/pexels-egor-kamelev-920160.jpg"
  ImageTwo = "assets/images/pexels-keemkai-villadums-2435728.jpg"

  currentImage = this.ImageOne
  prevImage(){
    this.currentImage = this.currentImage === this.ImageOne ? this.ImageTwo: this.ImageOne

  }
  nextImage(){
    this.currentImage = this.currentImage === this.ImageOne ? this.ImageTwo: this.ImageOne
  }

}
