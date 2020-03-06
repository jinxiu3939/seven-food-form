import { Observable } from 'rxjs';
import { ResourceSearchParam, FileResource } from './test-form.options';
/**
 * 资源提供者
 */
export abstract class ResourceProvider {
  /**
   * 解析上传结果
   * @param response `json`解析后的上传结果
   */
  abstract parseUploadResult(response: any): { error: string, url: string };

  /**
   * 解析保存结果
   * @param response `json`解析后的上传结果
   */
  abstract parseSaveResult(response: any): { error: string, url: string };

  /**
   * 获取检索结果
   * @param param 检索参数
   */
  abstract getSearchResult(param: ResourceSearchParam)
    : Observable<{ error: string, total: number, list: FileResource[] }>;
}
