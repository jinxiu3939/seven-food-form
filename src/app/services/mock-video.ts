import {
  QuickFormFactory,
  VideoModelFactory,
} from '../modules/dynamic-form';

export const videoModels: any = [
  new QuickFormFactory({
    label: '服务器多媒体',
    multiple: true,
    name: 'video-1',
    queueLimit: 2,
    require: true,
    uploadConfig: null,
    block: 1,
    hideCrawl: true,
    hideCropper: true,
    min: 2,
  }).video(),
  new VideoModelFactory({
    label: '同步多媒体',
    name: 'video-2',
    multiple: true,
    searchDisplay: 'list',
    debug: true,
    value: [{url:'https:////player.bilibili.com/player.html?aid=502378542&bvid=BV17K411w7M7&cid=321435235&page=1&width=500&height=375&auto=0'}]
  }).instance(),
  {
    type: 'video',
    display: 'input',
    name: 'video-3',
    label: '哪来的small',
    width: 5,
    value: [1,2,3],
    max: 2,
    disabled: true,
  },
];
