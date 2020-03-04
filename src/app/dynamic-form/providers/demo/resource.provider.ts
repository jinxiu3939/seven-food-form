import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FileResource, ResourceProvider, ResourceSearchParam } from '../../dynamic-form.options';

@Injectable()
export class DemoResourceProvider extends ResourceProvider {

  private api: string = '/api/index/index/lists';

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * 解析上传结果
   * @param response `json`解析后的上传结果
   */
  parseUploadResult(response: any): { error: string, url: string } {
    const result = { error: '', url: ''};
    if (response && response.status !== null && response.content !== null) {
      if (response.status.code === 200) {
        result.url = response.content.url;
      } else {
        result.error = response.status.message
          + (response.status.sub_message ? '（' + response.status.sub_message + '）' : '');
      }
    } else {
      result.error = `上传图片失败（系统错误）`;
    }
    return result;
  }

  /**
   * 解析保存结果
   * @param response `json`解析后的上传结果
   */
  parseSaveResult(response: any): { error: string, url: string } {
    const result = { error: '', url: ''};
    if (response !== false) {
      if (response && response.status !== null && response.content !== null) {
        if (response.status.code !== 200) {
          result.error = response.status.message
            + (response.status.sub_message ? '（' + response.status.sub_message + '）' : '');
        } else {
          /* 保存成功 */
          result.url = response.content.url;
        }
      } else {
        result.error = `保存图片失败（系统错误）`;
      }
    } else {
      result.error = `保存图片失败（系统繁忙）`;
    }
    return result;
  }

  /**
   * 获取检索结果
   * @param param 检索参数
   */
  getSearchResult(param: ResourceSearchParam): Observable<{ error: string, total: number, list: FileResource[] }> {
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
        const result = { error: '', total: 0, list: [] };
        if (tempRes !== false) {
          if (tempRes && tempRes.status !== null && tempRes.content !== null) {
            if (tempRes.status.code !== 200) {
              result.error = tempRes.status.message
                + (tempRes.status.sub_message ? '（' + tempRes.status.sub_message + '）' : '');
            } else {
              result.total = tempRes.content.total; // 设置分页
              result.list = tempRes.content.list; // 本次检索结果
            }
          } else {
            result.error = `获取图片失败（系统错误）`;
          }
        } else {
          result.error = `获取图片失败（系统繁忙）`;
        }
        return result;
      }),
    );
  }

  private handleHttpError() {
    return of(false);
  }

}
