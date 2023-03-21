import {
  QuickFormFactory,
  KeywordModelFactory,
} from '../modules/dynamic-form';
import { checkboxTree } from './mock-checkboxtree';
import { images } from './mock-images';
import { options } from './mock-options';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'; // 导入`ckeditor`模块

export const appKey = 'wen-DFOeite.hte';
export const token = '6755AnY6vbqYGN7EWK5jjiTvj5bN+tudnAVGhm6ppFIWv2UkFiJE';
export const defaultModels = [
  {
    title: "活命1",
    column: 3,
    items: [
      new QuickFormFactory({
        label: '族谱',
        name: 'tree1',
        tree: checkboxTree,
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
        value: ['三国', '武当'],
        options: ['汉', '三维', '射雕', '魅惑', '汉', '三维', '射雕', '魅惑', '汉', '三维', '射雕', '魅惑']
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
          {text: '名称种颜色一种颜色一种颜色一种颜色', type: 'input', value: 'name'},
          {text: '数量', type: 'number', value: 'number'},
          {text: '描述', type: 'drop-down-filter', value: 'menu', options: [
            { text: '苹果', value: 'apple', title : '一种水果' },
            { text: '梨', value: 'pear', title : '一种水果' },
          ]},
          {text: '描述', type: 'drop-down-filter', value: 'sha', options: [
            { text: '苹果', value: 'apple', title : '一种水果' },
            { text: '梨', value: 'pear', title : '一种水果' },
          ]},
          {text: '禁用', type: 'boolean-radio', value: 'disabled'},
        ],
        size: 'large'
      }).itemList(),
      new QuickFormFactory({
        display: '',
        label: '图片',
        multiple: true,
        name: 'image-1',
        uploadConfig: {
          authTokenHeader: 'Token',
          authToken: '10aczKnVu0/SVz67zVLVH2qocXVary9P6c9JanLzbK2U4x/9uTfH',
          url: '/api/access/upload/image',
        },
        value: null,
        list: images,
      }).image(),
      new QuickFormFactory({
        label: '颜色',
        name: 'color',
        type: 'radio',
        options: [
          { text: '红色一种颜色一种颜色一种颜色一种颜色一种颜色', value: 'red', title : '一种颜色' },
          { text: '绿色一种颜色一种颜色一种颜色一种颜色一种颜色', value: 'green', title : '大自然的颜色', items: 100 },
          { text: '绿色', value: 'green', title : '大自然的颜色', items: 6 },
          { text: '绿色', value: 'green', title : '大自然的颜色', items: 0 },
          { text: '绿色', value: 'green', title : '大自然的颜色' },
        ],
        value: 'red',
        width: 3
      }).radio(),
      new QuickFormFactory({
        label: '颜色',
        name: 'color',
        type: 'radio',
        options: [
          { text: '红色红色一种颜色一种颜色一种颜色一种颜色一种颜色', value: 'red', title : '一种颜色'},
          { text: '绿色颜色一种颜色一种颜色一种颜色颜色一种颜一颜色一种颜', value: 'green', title : '大自然的颜色', items: 1000 },
          { text: '红色', value: 'red', title : '一种颜色' },
          { text: '绿色', value: 'green', title : '大自然的颜色', items: 1000 },
          { text: '红色一种颜色一种颜色一种颜色一种颜色一种颜色', value: 'red', title : '一种颜色' },
          { text: '绿色', value: 'green', title : '大自然的颜色', items: 1000 },
        ],
        value: ['red'],
        width: 3
      }).checkbox(),
      {
        label: '颜色',
        name: 'color2',
        options: [
          { text: '红色', value: 'red', title : '一种颜色', items: '99+' },
          { text: '绿色', value: 'green', title : '大自然的颜色', items: 10 },
          { text: '青色', value: 'cyan', title : '大自然的颜色' },
        ],
        type: 'checkbox',
        value: ['red'],
        disabled: false,
        help: 'this is a checkbox demo',
        max: 10,
        min: 3,
        order: 1,
        require: true,
        validator: '',
      },
      // new QuickFormFactory({
      //   label: '是否禁用',
      //   name: 'yes_no1',
      //   value: null,
      //   options: null,
      //   all: true,
      // }).booleanRadio(),
      {
        label: '是否禁用',
        name: 'yes_no3',
        options: [
          { text: '是', value: true },
          { text: '否', value: false, items: '99+' },
          { text: '全部', value: true },
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
        label: '自动全部下拉框',
        name: 'drop-down-no-all',
        options: [
          { text: '苹果', value: 'apple', title : '一种水果' },
          { text: '梨', value: 'pear', title : '一种水果' },
        ],
      }).dropDownBox(),
      new QuickFormFactory({
        // display: 'input',
        label: '服务器图片',
        multiple: true,
        name: 'image-2',
        queueLimit: 5,
        searchDisplay: 'page',
        aspectRatioHeight: 10,
        aspectRatioWidth: 4,
        cropperType: 'jpeg',
        hideCropper: false,
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
      }).image(),
      {
        "data": {
            "method": "image"
        },
        "help": "",
        "label": "头像",
        "max": 0,
        "min": 0,
        "name": "avatar",
        "order": 0,
        "debug": "true",
        "require": false,
        "type": "image",
        "validator": "",
        "value": "http://file.qikecai.localhost/picture/20230224/0c7922915ef276325d3b645e09dad0d0661.png",
        "crawlConfig": {
            "additionalParameter": null,
            "api": "/api/home/attachment/index",
            "headers": {
                "Token": "5df7REnMPVE6DoQ2aGOw5or2Y+61XKt6+6DoUJ9/q5GUMQDXM3w4",
                "App-Key": "12eewer3"
            }
        },
        "cropperConfig": {
            "additionalParameter": null,
            "headers": {
                "Token": "5df7REnMPVE6DoQ2aGOw5or2Y+61XKt6+6DoUJ9/q5GUMQDXM3w4",
                "App-Key": "12eewer3"
            },
            "url": "/api/home/image/index"
        },
        "searchConfig": {
            "additionalParameter": {
                "page_size": 9
            },
            "api": "/api/home/image/index",
            "display": "list",
            "headers": {
                "Token": "5df7REnMPVE6DoQ2aGOw5or2Y+61XKt6+6DoUJ9/q5GUMQDXM3w4",
                "App-Key": "12eewer3"
            },
            "mode": "async",
            "result": null
        },
        "uploadConfig": {
            "additionalParameter": {
                "App-Key": "12eewer3"
            },
            "allowedFileType": null,
            "authToken": "5df7REnMPVE6DoQ2aGOw5or2Y+61XKt6+6DoUJ9/q5GUMQDXM3w4",
            "authTokenHeader": "Token",
            "itemAlias": null,
            "maxFileSize": 104857600,
            "method": null,
            "url": "/api/home/image/index"
        }
      },
      new QuickFormFactory({
        label: '关联字段',
        name: 'field_id',
        options: [],
        searchConfig: {
          conditions: [
            {
              text: '模型',
              type: 'drop-down-filter',
              value: 'system_model_id',
              options: [
                { text: '分类', value: 99, title : 'taxonomy', items: null },
              ],
              mode: 'async',
              endpoint: '/api/frame/form/index',
            },
            {
              text: '模型',
              type: 'boolean-radio',
              value: 'form_id',
            },
          ],
          additionalParameter: {
            format: "option",
            system_model_id: 1
          },
          endpoint: '/api/log/error/index',
          mode: 'async',
          result: [],
          size: 30,
          headers: {
            'Token': 'b01dngfAbZaDKdX/ODLHrYd0pUxxLGlFHW/0W7PrbZtju65PeNkf',
            'App-Key': 'wen-DFOeite.hte',
          },
        },
        value: '',
        text: '',
        // readonly: true,
      }).popupRadio(),
      new QuickFormFactory({
        label: '同步关联',
        name: 'field_id-2',
        options: options,
        searchConfig: {},
        value: '1',
        text: '只读',
        size: '',
        // readonly: true,
      }).popupRadio(),
      new QuickFormFactory({
        label: '模型',
        name: 'model-2',
        value: '',
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
        require: false,
        editor: ClassicEditor,
      }).ckEditor(),
      new QuickFormFactory({
        label: '富文本内容',
        name: 'content-body-1',
        require: true,
        // kind: 'classic',
        editorConfig: {
          token: '33567clZ3oAzAMzlFq5JvCwXxwvL1G9RxtjXox7ZkuC2cGSDaZv0',
        },
      }).uEditor(),
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
        label: '附件',
        name: 'file',
        kind: ['json', 'xls'],
        download: 'http://api.oss.localhost'
      }).file(),
    ],
    title: "活命2",
    column: ['4', 14],
  },
  {
    items: [
      new QuickFormFactory({
        label: '富文本内容',
        name: 'content-body-2',
        // kind: 'classic',
        editorConfig: {
          token: '33567clZ3oAzAMzlFq5JvCwXxwvL1G9RxtjXox7ZkuC2cGSDaZv0',
        },
      }).uEditor(),
      {
        label: '下拉框',
        name: 'drop-down-3',
        type: 'drop-down-box',
        value: '',
        help: 'this is a text area',
        options: [
          { text: '苹果', value: 'apple', title : '一种水果' },
          { text: '梨', value: 'pear', title : '一种水果' },
        ],
        require: true,
        order: 1,
        placeholder: '',
        validator: '',
      },
    ],
    title: "富文本"
  },
  {
    items: [
      // new QuickFormFactory({
      //   label: '富文本内容',
      //   name: 'content-body-3',
      //   value: '```hello```',
      //   editorConfig: {
      //     readOnly: false,
      //     imageUploadURL: '/api/access/tool.mdeditor/image?token=123&app-key=239487',
      //   },
      // }).mdEditor(),
    ],
    title: "markdown富文本"
  },
];