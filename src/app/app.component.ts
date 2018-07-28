import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient){}

  test(){
    this.http.get(`http://localhost:3000/events`).subscribe(res=>{
      console.log(res)
    });
  }
}
