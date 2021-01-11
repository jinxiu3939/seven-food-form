import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get('/api/index/index');
  }

  post(form) : Observable<any> {
    return this.http.post('/api/access/model/tool/import', form , {
      headers: {
        'Token': '1eade3UQmRCbrxniSjYSOqGOw7+KlbzQVi4bc6sDqz7XLOexiTY9',
      }
    });
  }
}
