import {
  QuickFormFactory,
} from '../modules/dynamic-form';

export const goodsModels: any = [
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