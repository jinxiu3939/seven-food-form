import {
  QuickFormFactory,
  ImageModelFactory,
} from '../modules/dynamic-form';

import { images } from './mock-images-data';
import { token, appKey } from './mock-one';

export const imageModels: any = [
  new QuickFormFactory({
    label: '服务器图片',
    multiple: true,
    name: 'image-2',
    queueLimit: 2,
    searchDisplay: 'page',
    aspectRatioHeight: 10,
    aspectRatioWidth: 4,
    cropperType: 'jpeg',
    debug: true,
    cropperConfig: {
      url: '/api/home/image/index',
      additionalParameter: {
        tag: ['参数吧'],
        title: '设置了比例',
        topic: '在这儿呢'
      },
      headers: {
        'Token': token,
        'App-Key': appKey,
      },
      maxFileSize: 1024,
    },
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: token,
      url: '/api/home/image/index',
      additionalParameter: {
        tag: ['参数吧'],
        title: '',
        topic: '在这儿呢',
        'App-Key': appKey
      },
    },
    crawlConfig: {
      api: '/api/home/attachment/index',
      additionalParameter: {
        type: 'image',
        'app-key': appKey
      },
      headers: {
        'Token': token,
        'App-Key': appKey
      },
    },
    searchConfig: {
      additionalParameter: {
        page_size: 9.0,
      },
      api: '/api/home/image/index',
      headers: {
        'Token': token,
        'App-Key': appKey,
      },
      mode: 'async',
    },
    block: 1,
    hideUpload: false,
    hideCropper: false,
  }).image(),
  new ImageModelFactory({
    label: '同步图片',
    name: 'zupu-1',
    repeat: true,
    multiple: true,
    list: images,
    searchDisplay: 'list',
    debug: true,
    min: 2,
    require: true,
    disabled: false,
    value: 'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-console/discuz/templet/css/index/img/features/features-1-3.svg'
  }).instance(),
  {
    type: 'image',
    display: 'input',
    name: 'animal-1',
    width: 5,
    max: 4,
    disabled: true,
    value: [{url:'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-console/discuz/templet/css/index/img/features/features-1-3.svg'}, {url:'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-console/discuz/templet/css/index/img/features/features-1-3.svg'}, {url:'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-console/discuz/templet/css/index/img/features/features-1-3.svg'}]
  },
];
