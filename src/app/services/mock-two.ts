import {
  QuickFormFactory,
} from '../modules/dynamic-form';

export const  twoLayoutModels = [
  {
    "disabled": false,
    "options": [],
    "searchConfig": {
      "additionalParameter": {
        "format": "option"
      },
      "conditions": [
        {
          "type": "input",
          "text": "产品",
          "value": "keyword",
          "options": null
        }
      ],
      "mode": "async",
      "result": [],
      "size": 30,
      "endpoint": "/api/machine/goods",
      "headers": {
        "Token": "96fbnL4A26KhpMuOKjMOMyFwYdQxeq4lg5t3jOG7fbkzXdfnvf/J",
        "App-Key": "123"
      },
    },
    "text": "",
    "value": "",
    "label": "产品",
    "name": "parts_code",
    "type": "popup-checkbox",
    "help": "",
    "max": 0,
    "min": 0,
    "order": 0,
    "require": false,
    "validator": "",
    "data": "popupCheckbox",
    block: 1,
  },
  {
    "disabled": false,
    "kind": "ng2-file-upload",
    "multiple": false,
    "uploadConfig": {
      "additionalParameter": {
        "tag": [],
        "title": "",
        "topic": "",
        "App-Key": "123"
      },
      "allowedFileType": [
        "video"
      ],
      "authTokenHeader": "Token",
      "authToken": "3031PAtouX6FtY6u9FPvGsxnZyfG2iWSEBncgHYeFtBV9KZvI28a",
      "itemAlias": "video",
      "maxFileSize": 314572800,
      "method": "POST",
      "url": "/api/access/upload/video"
    },
    "label": "视频",
    "name": "video",
    "type": "video",
    "value": "",
    "help": "",
    "max": 0,
    "min": 0,
    "order": 0,
    "require": false,
    "validator": "",
    "data": "video",
    block: 7,
  },
  {
    "clear": false,
    "disabled": false,
    "kind": "text",
    "placeholder": "",
    "readonly": false,
    "value": "",
    "label": "编码",
    "name": "code",
    "type": "text-box",
    "help": "",
    "max": 100,
    "min": 0,
    "order": 0,
    "require": true,
    "validator": "",
    "data": "textBox",
    block: 6,
  },
  {
    "crawlConfig": {
      "additionalParameter": {
        "tag": [],
        "title": "",
        "topic": ""
      },
      "api": "/api/access/my/resource",
      "headers": {
        "Token": "96fbnL4A26KhpMuOKjMOMyFwYdQxeq4lg5t3jOG7fbkzXdfnvf/J",
        "App-Key": "123"
      },
      "queueLimit": 1
    },
    "disabled": false,
    "display": "image",
    "kind": "ng2-file-upload",
    "multiple": true,
    "searchConfig": {
      "additionalParameter": {
        "page_number": 1,
        "page_size": 9,
        "type": "image"
      },
      "api": "/api/access/my/resource",
      "display": "list",
      "headers": {
        "Token": "96fbnL4A26KhpMuOKjMOMyFwYdQxeq4lg5t3jOG7fbkzXdfnvf/J",
        "App-Key": "123"
      },
      "mode": "async",
      "result": []
    },
    "uploadConfig": {
      "additionalParameter": {
        "tag": [],
        "title": "",
        "topic": "",
        "App-Key": "123"
      },
      "allowedFileType": [
        "image"
      ],
      "authTokenHeader": "Token",
      "authToken": "96fbnL4A26KhpMuOKjMOMyFwYdQxeq4lg5t3jOG7fbkzXdfnvf/J",
      "itemAlias": "image",
      "maxFileSize": 2097152,
      "method": "POST",
      "url": "/api/access/upload/image"
    },
    "label": "图片",
    "name": "cover",
    "type": "image",
    "value": "http://www.sanguosha.cn/storage/uploads/images/pic_list/1.png",
    "help": "",
    "max": 100,
    "min": 0,
    "order": 0,
    "require": false,
    "validator": "",
    "data": "image",
    block: 4,
  },
  {
    "disabled": false,
    "options": [],
    "searchConfig": {
      "additionalParameter": {
        "format": "option"
      },
      "conditions": [
        {
          "type": "input",
          "text": "编码",
          "value": "keyword",
          "options": null
        }
      ],
      "mode": "async",
      "result": [],
      "size": 30,
      "endpoint": "/api/machine/parts",
      "headers": {
        "Token": "96fbnL4A26KhpMuOKjMOMyFwYdQxeq4lg5t3jOG7fbkzXdfnvf/J",
        "App-Key": "123"
      },
      block: 2,
    },
    "text": "",
    "value": "",
    "label": "图片编码",
    "name": "parts_code",
    "type": "popup-radio",
    "help": "",
    "max": 0,
    "min": 0,
    "order": 0,
    "require": false,
    "validator": "",
    "data": "popupRadio",
    size: 'tiny',
    block: 1,
  },
  new QuickFormFactory({
    label: '富文本内容',
    name: 'content-body-3',
    value: '<h1>```hello```</h1><div>33</div>',
    editorConfig: {
      readOnly: false,
      imageUploadURL: '/api/access/tool.mdeditor/image?token=123&app-key=239487',
      autoFloatEnabled: false,
    },
    initialFrameHeight: 2400,
    allowDivTransToP: false,
    // topOffset: 0,
    // zIndex: 10000,
    block: 3,
  }).uEditor(),
];

export const twoLayoutSetting = {
  bodyWidth: 10,
  children: [
    {
      blockId: 100,
      blockTitle: "中文",
      blockLayout: 'tab',
      children: [
        {
          blockId: 1,
          blockTitle: "活命1",
        },
        {
          blockId: 2,
          blockTitle: "活命2",
          width: 9,
        },
        {
          blockId: 3,
          blockTitle: "富文本",
        },
        {
          blockId: 4,
          blockTitle: "markdown富文本",
        },
      ],
    },
    {
      blockId: 200,
      blockTitle: "英语",
      width: 9,
      blockLayout: 'tab',
      children: [
        {
          blockId: 5,
          blockTitle: "live",
        },
        {
          blockId: 6,
          blockTitle: "text",
          width: 9,
        },
      ],
    },
    {
      blockId: 300,
      blockTitle: "日语",
      children: [
        {
          blockId: 7,
          blockTitle: "editor",
        },
      ],
    },
  ],
};