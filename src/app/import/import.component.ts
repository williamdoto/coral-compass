import { Component } from '@angular/core';
interface General {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  general: General = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted', this.general);
    // Handle form submission logic here
  }
}
