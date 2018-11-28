import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  uri = window.location.protocol + "//" + window.location.host + "/api/v1/users";
  result: Object;

  constructor(private http: HttpClient) { }

  addUser(name, email) {
    const obj = {
      name: name,
      email: email
    };
    return this.http.post(`${this.uri}/add`, obj);
  }
}
