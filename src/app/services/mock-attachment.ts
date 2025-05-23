import {
  QuickFormFactory,
  AttachmentModelFactory,
} from '../modules/dynamic-form';

import { images } from './mock-images-data';
import { token, appKey } from './mock-one';

export const attachmentModels: any = [
  new QuickFormFactory({
    label: '异步附件',
    multiple: true,
    name: 'attach-1',
    queueLimit: 2,
    searchDisplay: 'page',
    debug: true,
    allowedUploadFileType: 'pdf,compress',
    maxUploadFileSize: 3000,
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: token,
      url: '/api/home/file/index?App-Key=' + encodeURIComponent(appKey),
      additionalParameter: {
        tag: ['参数吧'],
        // title: '是我的',
        topic: '在这儿呢',
        'app-key': appKey
      },
    },
    searchConfig: {
      additionalParameter: {
        page_size: 9.0,
      },
      api: '/api/home/file/index',
      headers: {
        'Token': token,
        'App-Key': appKey,
      },
      mode: 'async',
    },
    block: 1,
  }).attachment(),
  new AttachmentModelFactory({
    label: '同步文件',
    name: 'attach-sync-file',
    repeat: true,
    multiple: true,
    list: images,
    searchDisplay: 'page',
    searchMode: 'sync',
    debug: true,
    min: 2,
    require: true,
    allowedUploadFileType: ['pdf','compress'],
    maxUploadFileSize: 3000,
    disabled: false,
    value: [{url: 'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-console/discuz/templet/css/index/img/features/features-1-3.svg', title: ''}]
  }).instance(),
  {
    type: 'attachment',
    display: 'input',
    name: 'attach-2',
    label: '附件',
    width: 5,
    max: 4,
    drag: true,
    disabled: false,
    value: [{url:'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-console/discuz/templet/css/index/img/features/features-1-3.svg'}, {url:'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-console/discuz/templet/css/index/img/features/features-1-3.svg'}, {url:'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-console/discuz/templet/css/index/img/features/features-1-3.svg'}]
  },
];
