import { Component, OnInit } from '@angular/core';

import {
  QuickFormFactory,
  LinkageBoxModelFactory,
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
        new QuickFormFactory({
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
          label: '场馆',
          name: 'item-1',
          value: null,
          attributes: [
            {text: '名称', type: 'input', value: 'name'},
            {text: '描述', type: 'input', value: 'description'},
          ],
        }).itemList(),
        new QuickFormFactory({
          display: '',
          label: '图片',
          multiple: false,
          name: 'image-1',
          uploadConfig: {
            authTokenHeader: 'Token',
            authToken: '1949vx44zmVlndq4V9K9NeMgUX8WohaV/H+gBDFebNUTg0ufIg5t',
            url: '/api/upload/image',
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
            authToken: '7710bLMWPJgk57Ac9F8EkCrb1NA3yUgPHwnff8OvLXsgxGoGVXML',
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
              'Token': '7710bLMWPJgk57Ac9F8EkCrb1NA3yUgPHwnff8OvLXsgxGoGVXML',
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
              'Token': '7710bLMWPJgk57Ac9F8EkCrb1NA3yUgPHwnff8OvLXsgxGoGVXML',
              'App-Key': 'sssssdddddddgg',
            },
            mode: 'async',
          },
        }).image(),
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
          label: '吃的',
          name: 'text-1',
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
        {
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
        },
        new QuickFormFactory({
          clear: true,
          label: '日期时间',
          name: 'date-time-1',
          now: true,
          require: true,
          value: '哈啊哈',
        }).datePicker(),
      ],
      title: "活命1",
      column: ['4', 14],
    },
  ];
  goodsModels: any = [
    {
      items: [
        new QuickFormFactory({
          label: '名称',
          name: 'title',
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
            authToken: '7710bLMWPJgk57Ac9F8EkCrb1NA3yUgPHwnff8OvLXsgxGoGVXML',
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
              'Token': '7710bLMWPJgk57Ac9F8EkCrb1NA3yUgPHwnff8OvLXsgxGoGVXML',
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
    this.trees.push(this.checkboxTree);
    this.trees.push(this.checkboxTree);
    this.service.get().subscribe(() => {
      this.models = this.goodsModels;
    });
  }

  submit(value) {
    console.log(value);
    this.submitting = true;
  }

  operate(value) {
    console.log(value);
  }
}
