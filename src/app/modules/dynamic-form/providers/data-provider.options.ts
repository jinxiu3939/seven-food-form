import { Observable } from 'rxjs';

import {
  FileResource,
  Option,
  ResourceSearchParam,
  TreeNode,
} from '../dynamic-form.options';

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

/**
 * 简单搜索提供者
 */
export abstract class SearchProvider {
  /**
   * 设置检索地址
   * @param endpoint 地址
   */
  abstract setApi(endpoint: string): void;

  /**
   * 分页获取数据
   * @param page 页码
   * @param size 分页
   * @param condition 参数
   */
  abstract getPage(page: number, size: number, condition?: any): Observable<Option<any>[]>;
}

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
