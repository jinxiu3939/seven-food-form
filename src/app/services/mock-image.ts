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
    },
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: token,
      url: '/api/home/image/index',
      additionalParameter: {
        tag: ['参数吧'],
        title: '是我的',
        topic: '在这儿呢',
        'app-key': appKey
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
    hideCrawl: true,
    hideCropper: true,
  }).image(),
  new ImageModelFactory({
    label: '同步图片',
    name: 'zupu-1',
    repeat: true,
    multiple: true,
    list: images,
    searchDisplay: 'list',
    debug: true,
  }).instance(),
  {
    type: 'image',
    display: 'input',
    name: 'animal-1',
    width: 5,
    max: 4,
  },
];
