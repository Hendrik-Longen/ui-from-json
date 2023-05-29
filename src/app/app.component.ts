import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonFormData} from './json-component/json-component.component'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ui-from-json';

  public formData!: JsonFormData;
  
  constructor(private http: HttpClient) {}

  public getJSON(): Observable<any> {
    return this.http.get("./assets/my-form.json");
  }
  
  ngOnInit() {
    this.getJSON().subscribe(data => {
      this.formData = data;
    });
  }
}
