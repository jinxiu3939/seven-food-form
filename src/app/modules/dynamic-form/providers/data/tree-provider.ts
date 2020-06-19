import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  Option,
  TreeNode,
} from '../../dynamic-form.options';

/**
 * 树结构提供者
 */
export abstract class TreeProvider {
  /**
   * 设置检索地址
   * @param endpoint 地址
   */
  abstract setApi(endpoint: string): void;

  /**
   * 获取树结构
   * @param condition 参数
   */
  abstract getTree(condition?: any): Observable<TreeNode<Option<string | number>>[]>;
}

@Injectable()
export class DemoTreeSearchProvider extends TreeProvider {

  protected api: string = '/api/index/index/tree';

  constructor(private http: HttpClient) {
    super();
  }

  setApi(endpoint: string) {
    this.api = endpoint;
  }

  /**
   * 获取检索结果
   */
  getTree(param: any): Observable<TreeNode<Option<string | number>>[]> {
    /* 构造检索参数 */
    let http_params = new HttpParams();
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
              result = tempRes.content; // 检索结果
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
