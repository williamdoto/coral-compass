import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit{
  imageUrls = []
  imageUrl = this.imageUrls[0]
  currentIndex = 0

  changeImage(){
    if (this.currentIndex > this.imageUrls.length)    this.currentIndex = 0
    this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length
    this.imageUrl = this.imageUrls[this.currentIndex];
  }

  ngOnInit() {
    setInterval(() => {
      this.changeImage();
    }, 2000)
  }
}
