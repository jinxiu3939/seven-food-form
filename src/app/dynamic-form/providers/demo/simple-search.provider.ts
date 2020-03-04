import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Option, SearchProvider} from '../../dynamic-form.options';

@Injectable()
export class DemoSimpleSearchProvider extends SearchProvider {

  protected api: string = '/api/index/index/search';

  constructor(private http: HttpClient) {
    super();
  }

  setApi(endpoint: string) {
    this.api = endpoint;
  }

  /**
   * 获取检索结果
   * @param param 检索参数
   */
  getPage(page: number, size: number, param: any): Observable<Option<any>[]> {
    /* 构造检索参数 */
    let http_params = new HttpParams();
    http_params = http_params.set('page_number', page + '');
    http_params = http_params.set('page_size', size + '');
    for (const condition in param) {
      if (param[condition]) {
        http_params = http_params.set(condition, param[condition]);
      }
    }
    /* 检索 */
    return this.http.get<any>(this.api, { params: http_params })
    .pipe(
      catchError(this.handleHttpError), // 首先捕获异常，然后处理异常
      map((tempRes) => {
        let result = [];
        if (tempRes !== false) {
          if (tempRes && tempRes.status !== null && tempRes.content !== null) {
            if (tempRes.status.code === 200) {
              result = tempRes.content.list; // 检索结果
            }
          }
        }
        return result;
      }),
    );
  }

  private handleHttpError() {
    return of(false);
  }

}
