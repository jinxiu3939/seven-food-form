import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get('http://localhost/qikecai-backend/api/cms/demo/index/create?timestamp=1691550109&sign=e03d965f46f98c7bf94ce88fc13fcc80', {
      headers: {
        Token: 'fd4fGICP/Ph+RotPbId6xb7iA79Ie3DCsWXNQgq6ucglgIx22sYx',
        'App-Key': 'dwen-DFOeite.*hte'
      }
    });
  }

  post(form) : Observable<any> {
    return this.http.post('/api/access/model/tool/import', form , {
      headers: {
        'Token': '1eade3UQmRCbrxniSjYSOqGOw7+KlbzQVi4bc6sDqz7XLOexiTY9',
      }
    });
  }
}
