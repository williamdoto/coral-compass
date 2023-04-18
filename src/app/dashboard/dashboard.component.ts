import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit{
  imageUrls = ["https://cdn.pixabay.com/photo/2016/03/27/17/12/water-1283152_960_720.jpg","https://cdn.pixabay.com/photo/2023/03/28/02/53/lagoon-7882110_960_720.jpg"]
  imageUrl = this.imageUrls[0]
  currentIndex = 0

  changeImage(){
    if (this.currentIndex > this.imageUrls.length)    this.currentIndex = 0
    this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length
    this.imageUrl = this.imageUrls[this.currentIndex];
  }
  
  nextImage(){
    if (this.currentIndex > this.imageUrls.length)    this.currentIndex = 0
    this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length
    this.imageUrl = this.imageUrls[this.currentIndex];
  }

  prevImage(){
    this.currentIndex = (this.currentIndex - 1) % this.imageUrls.length
    this.imageUrl = this.imageUrls[this.currentIndex];
  }

  ngOnInit() {
    setInterval(() => {
      this.changeImage();
    }, 6000)
  }
}
