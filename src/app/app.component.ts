import { Component, OnInit } from '@angular/core';

import {
  QuickFormFactory,
  LinkageBoxModelFactory,
  KeywordModelFactory,
} from './modules/dynamic-form';

import { ApiService } from './services/api.service';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'seven-food-form';
  options = [
    { text: '选项A', value: 'A', title : '选项A', items: '99+' },
    { text: '选项B', value: 'B', title : '选项B' },
    { text: '选项C', value: 'C', title : '选项C' },
    { text: '选项D', value: 'D', title : '选项D，我很长哦，你能拿我怎么样呢？我是很长，我就是要换行，今天和诺或，不如出去偶走走快', items: '99+' },
    { text: '选项E', value: 'E', title : '选项E' },
    { text: '选项F', value: 'F', title : '选项F，很长不是你说很长就很长，不是你想要很长，就能很长，很长会换行' },
    { text: '选项G', value: 'G', title : '选项G', items: 11 },
    { text: '选项H', value: 'H', title : '选项H' },
    { text: '选项I', value: 'I', title : '选项I' },
    { text: '选项J', value: 'J', title : '选项J', items: 6 },
    { text: '选项K', value: 'K', title : '选项K' },
    { text: '选项L', value: 'L', title : '选项L' },
    { text: '选项M', value: 'M', title : '选项M', items: '99+' },
    { text: '选项N', value: 'N', title : '选项N' },
    { text: '选项U', value: 'R', title : '选项R' },
  ];
  realModels = [
    {
      "column": [
        "2",
        "10"
      ],
      "title": "默认产品",
      "items": [
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
          "data": "textBox"
        },
        {
          "clear": false,
          "disabled": false,
          "kind": "text",
          "placeholder": "",
          "readonly": false,
          "value": "",
          "label": "名称",
          "name": "title",
          "type": "text-box",
          "help": "产品名称",
          "max": 100,
          "min": 0,
          "order": 0,
          "require": true,
          "validator": "",
          "data": "textBox"
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
          "value": "",
          "help": "",
          "max": 100,
          "min": 0,
          "order": 0,
          "require": false,
          "validator": "",
          "data": "image"
        },
        {
          "disabled": false,
          "mode": "sync",
          "text": "",
          "tree": [
            {
              "data": {
                "text": "电子",
                "value": 1,
                "title": "电子",
                "items": null
              },
              "children": [
                {
                  "data": {
                    "text": "手机壳",
                    "value": 4,
                    "title": "手机壳",
                    "items": null
                  },
                  "children": [
                    {
                      "data": {
                        "text": "铁质",
                        "value": 5,
                        "title": "铁质",
                        "items": null
                      },
                      "children": [],
                      "expanded": true
                    },
                    {
                      "data": {
                        "text": "塑料",
                        "value": 6,
                        "title": "塑料",
                        "items": null
                      },
                      "children": [],
                      "expanded": true
                    }
                  ],
                  "expanded": true
                }
              ],
              "expanded": true
            },
            {
              "data": {
                "text": "化工",
                "value": 2,
                "title": "化工",
                "items": null
              },
              "children": [],
              "expanded": false
            },
            {
              "data": {
                "text": "设备",
                "value": 7,
                "title": "设备",
                "items": null
              },
              "children": [
                {
                  "data": {
                    "text": "电气设备",
                    "value": 8,
                    "title": "电气设备",
                    "items": null
                  },
                  "children": [],
                  "expanded": false
                },
                {
                  "data": {
                    "text": "机械设备",
                    "value": 9,
                    "title": "机械设备",
                    "items": null
                  },
                  "children": [
                    {
                      "data": {
                        "text": "1马力",
                        "value": 10,
                        "title": "1马力",
                        "items": null
                      },
                      "children": [],
                      "expanded": false
                    },
                    {
                      "data": {
                        "text": "2马力",
                        "value": 11,
                        "title": "2马力",
                        "items": null
                      },
                      "children": [],
                      "expanded": false
                    }
                  ],
                  "expanded": false
                }
              ],
              "expanded": false
            },
            {
              "data": {
                "text": "零件",
                "value": 12,
                "title": "零件",
                "items": null
              },
              "children": [
                {
                  "data": {
                    "text": "进口",
                    "value": 13,
                    "title": "进口",
                    "items": null
                  },
                  "children": [
                    {
                      "data": {
                        "text": "免税",
                        "value": 15,
                        "title": "免税",
                        "items": null
                      },
                      "children": [],
                      "expanded": false
                    },
                    {
                      "data": {
                        "text": "奢侈品",
                        "value": 16,
                        "title": "奢侈品",
                        "items": null
                      },
                      "children": [],
                      "expanded": false
                    }
                  ],
                  "expanded": false
                },
                {
                  "data": {
                    "text": "国产",
                    "value": 14,
                    "title": "国产",
                    "items": null
                  },
                  "children": [
                    {
                      "data": {
                        "text": "本地",
                        "value": 17,
                        "title": "本地",
                        "items": null
                      },
                      "children": [],
                      "expanded": false
                    },
                    {
                      "data": {
                        "text": "外地",
                        "value": 18,
                        "title": "外地",
                        "items": null
                      },
                      "children": [],
                      "expanded": false
                    }
                  ],
                  "expanded": false
                }
              ],
              "expanded": false
            }
          ],
          "value": "",
          "label": "类别",
          "name": "cat_id",
          "type": "popup-tree",
          "help": "关联类别",
          "max": 0,
          "min": 0,
          "order": 0,
          "require": true,
          "validator": "",
          "data": "popupTree"
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
          "data": "popupRadio"
        },
      ],
      "is_default": false,
      "id": 8
    },
    {
      "column": [
        2,
        10
      ],
      "title": "",
      "items": [
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
          "data": "popupCheckbox"
        },
        {
          "disabled": false,
          "rows": 3,
          "label": "备注",
          "name": "description",
          "type": "text-area",
          "value": "",
          "help": "",
          "max": 0,
          "min": 0,
          "order": 0,
          "require": false,
          "validator": "",
          "data": "textArea"
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
            "authToken": "96fbnL4A26KhpMuOKjMOMyFwYdQxeq4lg5t3jOG7fbkzXdfnvf/J",
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
          "data": "video"
        }
      ],
      "is_default": true,
      "id": 0
    }
  ];
  tree: any = {
    options: [
      { text: '选项A', value: 'A', parent : 0 },
      { text: '选项B', value: 'B', parent : 0 },
      { text: '选项C', value: 'C', parent : 0 },
    ],
    selected: 'A', // 选中的值
    children: {
      options: [
        { text: '大伯', value: 1, parent : 'A' },
        { text: '爸爸', value: 2, parent : 'A' },
        { text: '叔叔', value: 3, parent : 'A' },
        { text: '阿姨', value: 4, parent : 'B' },
        { text: '婶婶', value: 5, parent : 'B' },
        { text: '舅妈', value: 6, parent : 'B' },
        { text: '岳母', value: 7, parent : 'C' },
        { text: '老师', value: 8, parent : 'C' },
        { text: '经理', value: 9, parent : 'C' },
      ],
      selected: 1, // 选中的值
      children: {
        options: [
          { text: '哥哥', value: 'gege', parent : 1 },
          { text: '弟弟', value: 'didi', parent : 1 },
          { text: '妹妹', value: 'meimei', parent : 1 },
          { text: '表哥', value: 'biaoge', parent : 2 },
          { text: '表弟', value: 'biaodi', parent : 2 },
          { text: '表妹', value: 'biaomei', parent : 2 },
          { text: '学姐', value: 'xuejie', parent : 8 },
          { text: '学弟', value: 'xuedi', parent : 8 },
          { text: '学妹', value: 'xuemei', parent : 8 },
          { text: '财务', value: 'caiwu', parent : 9 },
          { text: '人事', value: 'renshi', parent : 9 },
          { text: '行政', value: 'xingzheng', parent : 9 },
        ],
        selected: 'gege', // 选中的值
      },
    },
  };
  checkboxTree: any = {
    value: 1, // 值
    title: 'https://img.alicdn.com/i2/2074450097/O1CN01zMdiS61CaT1NADGbn_!!2074450097-0-lubanu-s.jpg_230x230', // 标题
    text: '祖宗', // 文本
    items: '1', // 元素数量
    children: [
      {
        value: 2, // 值
        title: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3416980019,137582677&fm=26&gp=0.jpg', // 标题
        text: '爷爷', // 文本
        items: '3', // 元素数量
        children: [
          {
            value: 3, // 值
            title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
            text: '大伯', // 文本
          },
          {
            value: 4, // 值
            title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
            text: '爸爸', // 文本
            items: '1', // 元素数量
            children: [
              {
                value: 5, // 值
                title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                text: '我自己', // 文本
                children: [
                  {
                    value: 13, // 值
                    title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                    text: '大儿子', // 文本
                    items: '1099',
                  },
                  {
                    value: 14, // 值
                    title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                    text: '二儿子', // 文本
                    items: '12', // 元素数量
                  },
                  {
                    value: 15, // 值
                    title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                    text: '三儿子', // 文本
                  },
                  {
                    value: 16, // 值
                    title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                    text: '四儿子', // 文本
                  },
                  {
                    value: 17, // 值
                    title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                    text: '五儿子', // 文本
                    items: '99+',
                  },
                  {
                    value: 18, // 值
                    title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                    text: '六儿子', // 文本
                  },
                  {
                    value: 19, // 值
                    title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                    text: '七儿子', // 文本
                  },
                ],
              },
              {
                value: 8, // 值
                title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                text: '妹妹', // 文本
                items: '999', // 元素数量
              },
            ],
          },
          {
            value: 6, // 值
            title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
            text: '三叔', // 文本
            children: [
              {
                value: 11, // 值
                title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                text: '哥哥', // 文本
              },
              {
                value: 12, // 值
                title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
                text: '妹妹', // 文本
              },
            ],
          },
        ],
      },
      {
        value: 7, // 值
        title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
        text: '二爷爷', // 文本
        children: [
          {
            value: 9, // 值
            title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
            text: '小叔', // 文本
          },
          {
            value: 10, // 值
            title: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=876468753,3306274246&fm=26&gp=0.jpg', // 标题
            text: '大叔', // 文本
          },
        ],
      },
    ],
  };
  modesss: any = [
    {
      items: [
        new LinkageBoxModelFactory({
          label: '族谱',
          name: 'zupu-1',
          require: true,
          tree: this.tree,
          root: 0,
        }).instance(),
        new QuickFormFactory({
          label: '族谱',
          name: 'zupu-2',
          tree: this.tree,
          root: 0,
        }).linkageBox(),
        new QuickFormFactory({
          display: '',
          label: '图片',
          multiple: false,
          name: 'image-1',
          uploadConfig: {
            authTokenHeader: 'Token',
            authToken: 'f74f3khvQQr1rk2KvXTc3Gi4D6W74qJ1YFr5EllmLyXujJAaylfq',
            url: '/api/access/upload/image',
          },
          value: null,
        }).image(),
        {
          label: '族谱',
          name: 'zupu-3',
          type: 'linkage-box',
          value: ['111'],
          help: 'this is a password',
          order: 1,
          tree: this.tree,
          root: 0,
        },
        new QuickFormFactory({
          label: '吃的',
          name: 'radio-2',
          options: this.options,
          searchConfig: {},
          value: '1',
          text: '只读',
          // readonly: true,
        }).popupRadio(),
        new QuickFormFactory({
          label: '视频',
          multiple: false,
          name: 'video-1',
          uploadConfig: {
            authTokenHeader: 'Token',
            authToken: 'f74f3khvQQr1rk2KvXTc3Gi4D6W74qJ1YFr5EllmLyXujJAaylfq',
            url: '/api/access/upload/video',
          },
        }).video(),
      ],
      title: "活命",
      column: 3,
    }
  ];
  images = [
    {
      id: 1,
      creation_time: '2019-12-25 13:00:00',
      file_name: 'screen.jpg',
      size: 313,
      tag: [],
      title: '文化寻宝',
      topic: 'game',
      type: 'image',
      url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/8dc60954-f40d-4ddc-94a8-1624325d32e8/original',
    },
  ];
  models: any;
  defaultModels = [
    {
      title: "活命1",
      column: 3,
      items: [
        /* new QuickFormFactory({
          label: '族谱',
          name: 'tree1',
          tree: this.checkboxTree,
          value: ['12', '11'],
        }).checkboxTree(),
        new QuickFormFactory({
          label: '验证码',
          name: 'password-2',
          max: 10,
        }).passwordBox(),
        new QuickFormFactory({
          label: '标签',
          name: 'tag',
          value: ['三国', '武当']
        }).keyword(),
        new KeywordModelFactory({
          label: '关键字',
          name: 'keyword',
          value: '',
          readonly: false,
        }).instance(),
        {
          label: '标签',
          name: 'tag-3',
          type: 'keyword',
          value: ['demo'],
          help: 'this is a video',
          order: 1,
          validator: '',
          readonly: true,
        },
        new QuickFormFactory({
          label: '场馆',
          name: 'item-1',
          value: null,
          attributes: [
            {text: '名称', type: 'input', value: 'name'},
            {text: '数量', type: 'number', value: 'number'},
            {text: '描述', type: 'drop-down-filter', value: 'menu', options: [
              { text: '苹果', value: 'apple', title : '一种水果' },
              { text: '梨', value: 'pear', title : '一种水果' },
            ]},
            {text: '描述', type: 'drop-down-filter', value: 'sha', options: [
              { text: '苹果', value: 'apple', title : '一种水果' },
              { text: '梨', value: 'pear', title : '一种水果' },
            ]},
          ],
        }).itemList(), */
        new QuickFormFactory({
          display: '',
          label: '图片',
          multiple: false,
          name: 'image-1',
          uploadConfig: {
            authTokenHeader: 'Token',
            authToken: '10aczKnVu0/SVz67zVLVH2qocXVary9P6c9JanLzbK2U4x/9uTfH',
            url: '/api/access/upload/image',
          },
          value: null,
          list: this.images,
        }).image(),
        new QuickFormFactory({
          label: '颜色',
          name: 'color',
          type: 'radio',
          options: [
            { text: '红色', value: 'red', title : '一种颜色', items: 1 },
            { text: '绿色', value: 'green', title : '大自然的颜色', items: 1000 },
          ],
          value: 'red',
        }).radio(),
        new QuickFormFactory({
          label: '颜色',
          name: 'color',
          type: 'radio',
          options: [
            { text: '红色', value: 'red', title : '一种颜色', items: 1 },
            { text: '绿色', value: 'green', title : '大自然的颜色', items: 1000 },
          ],
          value: 'red',
        }).checkbox(),
        {
          label: '颜色',
          name: 'color2',
          options: [
            { text: '红色', value: 'red', title : '一种颜色', items: '99+' },
            { text: '绿色', value: 'green', title : '大自然的颜色', items: 10 },
            { text: '青色', value: 'cyan', title : '大自然的颜色' },
          ],
          type: 'radio',
          value: 'red',
          disabled: false,
          help: 'this is a radio demo',
          max: 10,
          min: 3,
          order: 1,
          require: true,
          validator: '',
          width: 4,
        },
        new QuickFormFactory({
          label: '是否禁用',
          name: 'yes_no1',
          value: false,
          options: null,
        }).booleanRadio(),
        {
          label: '是否禁用',
          name: 'yes_no3',
          options: [
            { text: '是', value: true },
            { text: '否', value: false, items: '99+' },
          ],
          type: 'radio',
          value: false,
          disabled: false,
          help: 'this is a radio demo',
          order: 1,
          require: true,
          validator: '',
        },
        new QuickFormFactory({
          label: '下拉框',
          name: 'drop-down-1',
          options: [
            { text: '全部', value: '', title : '全部' },
            { text: '苹果', value: 'apple', title : '一种水果' },
            { text: '梨', value: 'pear', title : '一种水果' },
          ],
        }).dropDownBox(),
        new QuickFormFactory({
          display: 'input',
          label: '图片',
          multiple: false,
          name: 'image-2',
          uploadConfig: {
            authTokenHeader: 'Token',
            authToken: 'f74f3khvQQr1rk2KvXTc3Gi4D6W74qJ1YFr5EllmLyXujJAaylfq',
            url: '/api/upload/image',
            additionalParameter: {
              tag: ['参数吧'],
              title: '是我的',
              topic: '在这儿呢',
              'app-key': 'sssssdddddddgg'
            },
          },
          crawlConfig: {
            api: '/api/my/resource',
            additionalParameter: {
              type: 'image',
              'app-key': 'sssssdddddddgg'
            },
            headers: {
              'Token': 'f74f3khvQQr1rk2KvXTc3Gi4D6W74qJ1YFr5EllmLyXujJAaylfq',
              'App-Key': 'sssssdddddddgg',
            },
          },
          searchConfig: {
            additionalParameter: {
              page_size: 9.0,
            },
            api: '/api/my/resource',
            display: 'list',
            headers: {
              'Token': 'f74f3khvQQr1rk2KvXTc3Gi4D6W74qJ1YFr5EllmLyXujJAaylfq',
              'App-Key': 'sssssdddddddgg',
            },
            mode: 'async',
          },
        }).image(),
        new QuickFormFactory({
          label: '吃的',
          name: 'radio-2',
          options: this.options,
          searchConfig: {
            conditions: [
              {type: "input", text: "名称", value: "title", options: null},
              {text: '描述', type: 'drop-down-filter', value: 'menu', options: [
                { text: '苹果', value: 'apple', title : '一种水果' },
                { text: '梨', value: 'pear', title : '一种水果' },
              ]},
            ],
          },
          value: '1',
          text: '只读',
          // readonly: true,
        }).popupRadio(),
        new QuickFormFactory({
          label: '模型',
          name: 'model',
          value: '系统（虚拟）',
          text: '只读',
          min: 0,
          max: 0,
          require: true,
          // readonly: true,
        }).textBox(),
      ],
    },
    {
      items: [
        /* {
          label: '下拉框',
          name: 'drop-down-3',
          type: 'drop-down-box',
          value: '气球是怎么飞起来的呢？',
          help: 'this is a text area',
          options: [
            { text: '苹果', value: 'apple', title : '一种水果' },
            { text: '梨', value: 'pear', title : '一种水果' },
          ],
          order: 1,
          placeholder: '',
          validator: '',
        }, */
        new QuickFormFactory({
          clear: true,
          data: "datePicker",
          disabled: false,
          format: "YYYY-MM-DD HH:mm:ss",
          help: "",
          kind: "date-time",
          label: "结束日期",
          max: 0,
          min: 1,
          name: "end_date",
          now: false,
          readonly: true,
          order: 0,
          require: false,
          type: "date-picker",
          validator: "",
          value: "",
        }).datePicker(),
        new QuickFormFactory({
          clear: false,
          data: "datePicker",
          disabled: false,
          format: "YYYY-MM-DD HH:mm:ss",
          help: "",
          kind: "date",
          label: "开始日期",
          max: 0,
          min: 0,
          name: "start_date",
          now: false,
          order: 0,
          require: false,
          type: "date-picker",
          validator: "",
          value: "2020-11-14 09:08",
        }).datePicker(),
        new QuickFormFactory({
          label: '内容',
          name: 'content-1',
          kind: 'ckfinder',
          editorConfig: {
            ckfinder: {
              // Upload the images to the server using the CKFinder QuickUpload command.
              uploadUrl: '/ckfinder/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
            }
          },
        }).ckEditor(),
        new QuickFormFactory({
          label: '内容',
          name: 'file',
          kind: ['json', 'xls'],
        }).file(),
      ],
      title: "活命1",
      column: ['4', 14],
    },
  ];
  goodsModels: any = [
    {
      items: [
        new QuickFormFactory({
          label: '模型编号',
          name: 'model',
          value: null,
          min: 0,
          max: 0,
          require: true,
        }).textBox(),
        new QuickFormFactory({
          label: '代码',
          name: 'code',
          value: null,
          min: 0,
          max: 0,
          require: true,
        }).textBox(),
        new QuickFormFactory({
          display: 'input',
          label: '图片',
          multiple: false,
          name: 'image-2',
          uploadConfig: {
            authTokenHeader: 'Token',
            authToken: 'f74f3khvQQr1rk2KvXTc3Gi4D6W74qJ1YFr5EllmLyXujJAaylfq',
            url: '/api/access/upload/image',
            additionalParameter: {
              tag: ['参数吧'],
              title: '是我的',
              topic: '在这儿呢',
              'app-key': 'sssssdddddddgg'
            },
          },
          crawlConfig: {
            api: '/api/access/my/resource',
            additionalParameter: {
              type: 'image',
              'app-key': 'sssssdddddddgg'
            },
            headers: {
              'Token': 'f74f3khvQQr1rk2KvXTc3Gi4D6W74qJ1YFr5EllmLyXujJAaylfq',
              'App-Key': 'sssssdddddddgg',
            },
          },
          searchConfig: {
            additionalParameter: {
              page_size: 9.0,
            },
            api: '/api/access/my/resource',
            display: 'list',
            headers: {
              'Token': '7710bLMWPJgk57Ac9F8EkCrb1NA3yUgPHwnff8OvLXsgxGoGVXML',
              'App-Key': 'sssssdddddddgg',
            },
            mode: 'async',
          },
        }).image(),
        new QuickFormFactory({
          label: '配件',
          name: 'parts_id',
          options: [],
          searchConfig: {
            format: "option",
            conditions: [{type: "input", text: "名称", value: "title", options: null}],
            endpoint: "/api/machine/parts",
            mode: "async",
            result: null,
            size: 30,
          },
          value: '1',
          text: '只读',
          // readonly: true,
        }).popupRadio(),
      ],
      title: "商品",
      column: 3,
    }
  ];
  submitting = false;
  buttons = [
    {value: 'export', name: 'export'},
    {value: 'import', name: 'import'},
  ];
  trees = [];

  constructor(private service: ApiService) {}

  ngOnInit() {
    // this.trees.push(this.checkboxTree);
    // this.trees.push(this.checkboxTree);
    this.service.get().subscribe(() => {
      this.models = this.defaultModels;
    });
  }

  submit(form) {
    console.log(form);
    this.submitting = true;
    const formData = new FormData();
    for(let i in form) {
      formData.append(i, form[i]);
    }
    this.service.post(formData).subscribe();
  }

  operate(value) {
    console.log(value);
  }

  reset(flag) {
    console.log(flag);
  }
}
