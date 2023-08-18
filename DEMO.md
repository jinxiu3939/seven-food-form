## demo

the demo can be used as the value of models
that is the input param of DynamicFormComponent

- 实例化`RadioModel`

    1. 通用型

    ```
    [
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
      new RadioModelFactory({
        label: '颜色',
        name: 'color1',
        type: 'radio',
        options: [
          { text: '红色', value: 'red', title : '一种颜色', items: 1 },
          { text: '绿色', value: 'green', title : '大自然的颜色', items: 10 },
        ],
        value: 'red',
        require: true,
      }).instance(),
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
    ],
    ```

    2. `boolean`型

    ```
    [
      new QuickFormFactory({
        label: '是否禁用',
        name: 'yes_no1',
        value: false,
      }).booleanRadio(),
      new BooleanRadioModelFactory({
        label: '是否禁用',
        name: 'yes_no2',
        value: 0,
        require: true,
      }).instance(),
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
    ]
    ```

    3. 下拉型

    ```
    [
      new QuickFormFactory({
        label: '下拉框',
        name: 'drop-down-1',
        options: [
          { text: '全部', value: '', title : '全部' },
          { text: '苹果', value: 'apple', title : '一种水果' },
          { text: '梨', value: 'pear', title : '一种水果' },
        ],
      }).dropDownBox(),
      new DropDownBoxModelFactory({
        label: '菜单',
        name: 'drop-down-2',
        options: [
          { text: '苹果', value: 'apple', title : '一种水果' },
          { text: '梨', value: 'pear', title : '一种水果' },
        ],
      }).instance(),
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
    ],
    ```

- 实例化`TextBoxModel`

    1. 通用型

    ```
    [
      new QuickFormFactory({
        label: '名称',
        min: 4,
        name: 'case-name-1',
      }).textBox(),
      new TextBoxModelFactory({
        label: '名称',
        name: 'case-name-2',
      }).instance(),
      {
        kind: 'text',
        label: '名称',
        name: 'case-name-3',
        type: 'text-box',
        value: '诗和远方',
        clear: false,
        disabled: false,
        help: 'this is a demo',
        max: 10,
        min: 3,
        order: 1,
        placeholder: 'please input',
        readonly: false,
        require: true,
        validator: '',
      },
    ]，
    ```

    2. 时间型

    ```
    [
      new QuickFormFactory({
        label: '时间',
        name: 'time-demo',
        value: 'yes',
      }).timeTextBox(),
      new TimeTextBoxModelFactory({
        label: '名称',
        name: 'time-demo-1',
      }).instance(),
      {
        kind: 'time',
        label: '名称',
        name: 'time-demo-2',
        type: 'text-box',
        value: '12:12',
        clear: true,
        disabled: false,
        help: 'this is a demo',
        max: 10,
        min: 3,
        order: 1,
        placeholder: 'please input',
        readonly: false,
        require: true,
        validator: '',
      },
    ],
    ```

    3. 英文字母

    ```
    [
      new QuickFormFactory({
        label: '名称',
        name: 'letter-name',
        require: true,
      }).letterNameTextBox(),
      new LetterNameTextBoxModelFactory({
        label: '名称',
        name: 'letter-name-1',
      }).instance(),
      {
        kind: 'text',
        label: '名称',
        name: 'letter-name-2',
        type: 'text-box',
        value: 'com-her',
        clear: false,
        disabled: false,
        help: 'this is a demo',
        max: 10,
        min: 3,
        order: 1,
        placeholder: 'please input',
        readonly: false,
        require: true,
        validator: 'letterName',
      },
    ],
    ```

    4. 邮箱

    ```
    [
      new QuickFormFactory({
        label: '邮箱',
        name: 'email1',
        require: true,
      }).emailTextBox(),
      new EmailTextBoxModelFactory({
        label: '邮箱',
        name: 'email2',
      }).instance(),
      {
        kind: 'email',
        label: '邮箱',
        name: 'email3',
        type: 'text-box',
        value: '哈啊哈',
        clear: false,
        disabled: false,
        help: 'this is a demo',
        order: 1,
        placeholder: 'please input your email',
        readonly: false,
        require: true,
        validator: 'email',
      },
    ],
    ```

    5. 英文单词

    ```
    [
      new QuickFormFactory({
        label: '单词',
        name: 'word1',
        require: true,
      }).englishWordTextBox(),
      new EnglishWordTextBoxModelFactory({
        label: '单词',
        name: 'word2',
      }).instance(),
      {
        kind: 'text',
        label: '单词',
        name: 'wrod3',
        type: 'text-box',
        value: '哈啊哈',
        clear: false,
        disabled: false,
        help: 'this is a demo',
        order: 1,
        placeholder: 'please input your word',
        readonly: false,
        require: true,
        validator: 'englishWord',
      },
    ],
    ```

    6. 手机号码

    ```
    [
      new QuickFormFactory({
        label: '手机号码',
        name: 'mobile1',
        require: true,
      }).mobileTextBox(),
      new MobileTextBoxModelFactory({
        label: '手机号码',
        name: 'mobile2',
      }).instance(),
      {
        kind: 'text',
        label: '手机号码',
        name: 'mobile3',
        type: 'text-box',
        value: '哈啊哈',
        clear: false,
        disabled: false,
        help: 'this is a demo',
        max: 11,
        min: 0,
        order: 1,
        placeholder: 'please input your mobile',
        readonly: false,
        require: true,
        validator: 'mobile',
      },
    ],
    ```

    7. 中文

    ```
    new QuickFormFactory({
      label: '姓名',
      name: 'realname1',
      require: true,
    }).chineseWordTextBox(),
    new ChineseWordTextBoxModelFactory({
      label: '姓名',
      name: 'realname2',
    }).instance(),
    {
      kind: 'text',
      label: '姓名',
      name: 'realname3',
      type: 'text-box',
      value: '哈啊哈',
      clear: false,
      disabled: true,
      help: 'this is a demo',
      max: 10,
      min: 1,
      order: 1,
      placeholder: 'please input your real name',
      readonly: false,
      require: true,
      validator: 'chineseWord',
    },
    ```

    8. 本地日期时间

    ```
    new QuickFormFactory({
      label: '日期时间',
      name: 'datetime1',
      value: '哈啊哈',
      clear: true,
    }).dateTimeLocalTextBox(),
    new DateTimeLocalTextBoxModelFactory({
      label: '日期时间',
      name: 'datetime2',
    }).instance(),
    {
      kind: 'datetime-local',
      label: '日期时间',
      name: 'datetimelocal3',
      type: 'text-box',
      value: '',
      clear: true,
      disabled: false,
      help: 'this is a demo',
      max: 16,
      min: 0,
      order: 1,
      placeholder: '',
      readonly: false,
      require: true,
      validator: '',
    },
    ```

    9. 文件

    ```
    new QuickFormFactory({
      label: '文件',
      name: 'file-1',
      value: '灭有',
    }).fileTextBox(),
    new FileTextBoxModelFactory({
      label: '文件',
      name: 'file-2',
    }).instance(),
    {
      kind: 'file',
      label: '文件',
      name: 'file-3',
      type: 'text-box',
      value: null,
      clear: true,
      disabled: false,
      help: 'this is a demo',
      order: 1,
      placeholder: '',
      readonly: false,
      require: true,
      validator: '',
    },
    ```

    10. 数字

    ```
    new QuickFormFactory({
      label: '数字',
      name: 'number-1',
      value: '灭有',
    }).numberTextBox(),
    new NumberTextBoxModelFactory({
      label: '整形',
      name: 'number-2',
    }).instance(),
    {
      kind: 'number',
      label: '浮点',
      name: 'number-3',
      type: 'text-box',
      value: null,
      clear: true,
      disabled: false,
      help: 'this is a demo',
      order: 1,
      placeholder: '',
      readonly: false,
      require: true,
      validator: '',
    },
    ```

    11. 密码

    ```
    new QuickFormFactory({
      label: '保密',
      name: 'password-1',
      value: '灭有',
    }).passwordTextBox(),
    new PasswordTextBoxModelFactory({
      label: '暗文',
      name: 'password-2',
    }).instance(),
    {
      kind: 'password',
      label: '密码',
      name: 'password-3',
      type: 'text-box',
      value: null,
      clear: true,
      disabled: false,
      help: 'this is a demo',
      order: 1,
      placeholder: '',
      readonly: false,
      require: true,
      validator: '',
    },
    ```

    12. 域 

    ```
    new QuickFormFactory({
      label: '域',
      name: 'range-1',
      value: 100,
    }).rangeTextBox(),
    new RangeTextBoxModelFactory({
      label: '域',
      name: 'range-2',
    }).instance(),
    {
      kind: 'range',
      label: '域',
      name: 'range-3',
      type: 'text-box',
      value: 10,
      clear: true,
      disabled: false,
      help: 'this is a demo',
      min: 0,
      max: 55,
      order: 1,
      placeholder: '',
      readonly: false,
      require: true,
      validator: '',
    },
    ```

    13. 其他

    ```
    {
      kind: 'color',
      label: '调色板',
      name: 'color',
      type: 'text-box',
      value: 1,
      clear: false,
      disabled: false,
      help: 'this is a color',
      min: 1,
      order: 1,
      placeholder: '',
      readonly: false,
      require: true,
      validator: '',
    },
    {
      kind: 'month',
      label: '月份',
      name: 'month3',
      type: 'text-box',
      value: 1,
      clear: false,
      disabled: false,
      help: 'this is a month',
      min: 1,
      order: 1,
      placeholder: '',
      readonly: false,
      require: true,
      validator: '',
    },
    {
      kind: 'url',
      label: 'url',
      name: 'url3',
      type: 'text-box',
      value: '',
      clear: false,
      disabled: false,
      help: 'this is a url',
      min: 1,
      order: 1,
      placeholder: 'please input your url',
      readonly: false,
      require: true,
      validator: '',
    },
    {
      kind: 'week',
      label: '星期',
      name: 'week3',
      type: 'text-box',
      value: '',
      clear: false,
      disabled: false,
      help: 'this is a week',
      min: 1,
      order: 1,
      placeholder: '',
      readonly: false,
      require: true,
      validator: '',
    },
    ```

- 实例化`CheckboxModel`

```
[
  new QuickFormFactory({
    clear: true,
    label: '颜色',
    min: 2,
    name: 'color-1',
    options: [
      { text: 'a', value: 'A', title : '选项A', items: '99+' },
      { text: 'b', value: 'B', title : '选项B' },
      { text: 'c', value: 'C', title : '选项C' },
    ],
    type: 'radio',
    value: 'A',
  }).checkbox(),
  new CheckboxModelFactory({
    label: '颜色',
    name: 'color-2',
    options: [
      { text: 'A', value: 1, title : '选项A' },
      { text: 'B', value: 2, title : '选项B' },
      { text: 'C', value: 3, title : '选项C', items: 9912 },
    ],
    require: true,
    type: 'radio',
    value: 2,
  }).instance(),
  {
    label: '颜色',
    name: 'color-3',
    options: [
      { text: 'A', value: 1, title : '选项A' },
      { text: 'B', value: 2, title : '选项B' },
      { text: 'C', value: 3, title : '选项C' },
    ],
    type: 'checkbox',
    value: [3],
    disabled: false,
    help: 'this is a radio demo',
    max: 0,
    min: 1,
    order: 1,
    require: true,
    validator: '',
    width: 4,
  },
],
```

- 实例化`CheckboxTreeModel`

```
tree: any = {
  value: 1, // 值
  title: '我是祖宗', // 标题
  text: '祖宗', // 文本
  items: '1', // 元素数量
  children: [
    {
      value: 2, // 值
      title: '我是爷爷', // 标题
      text: '爷爷', // 文本
      items: '3', // 元素数量
      children: [
        {
          value: 3, // 值
          title: '我是大伯', // 标题
          text: '大伯', // 文本
        },
        {
          value: 4, // 值
          title: '我是爸爸', // 标题
          text: '爸爸', // 文本
          items: '1', // 元素数量
          children: [
            {
              value: 5, // 值
              title: '我就是我，不一样的花火', // 标题
              text: '我自己', // 文本
              children: [
                {
                  value: 13, // 值
                  title: '我的儿子', // 标题
                  text: '大儿子', // 文本
                  items: '1099',
                },
                {
                  value: 14, // 值
                  title: '我的儿子', // 标题
                  text: '二儿子', // 文本
                  items: '12', // 元素数量
                },
                {
                  value: 15, // 值
                  title: '我的儿子', // 标题
                  text: '三儿子', // 文本
                },
                {
                  value: 16, // 值
                  title: '我的儿子', // 标题
                  text: '四儿子', // 文本
                },
                {
                  value: 17, // 值
                  title: '我的儿子', // 标题
                  text: '五儿子', // 文本
                  items: '99+',
                },
                {
                  value: 18, // 值
                  title: '我的儿子', // 标题
                  text: '六儿子', // 文本
                },
                {
                  value: 19, // 值
                  title: '我的儿子', // 标题
                  text: '七儿子', // 文本
                },
              ],
            },
            {
              value: 8, // 值
              title: '我的妹妹', // 标题
              text: '妹妹', // 文本
              items: '999', // 元素数量
            },
          ],
        },
        {
          value: 6, // 值
          title: '我是叔叔', // 标题
          text: '三叔', // 文本
          children: [
            {
              value: 11, // 值
              title: '我的堂哥', // 标题
              text: '哥哥', // 文本
            },
            {
              value: 12, // 值
              title: '我的堂妹', // 标题
              text: '妹妹', // 文本
            },
          ],
        },
      ],
    },
    {
      value: 7, // 值
      title: '我是二爷爷', // 标题
      text: '二爷爷', // 文本
      children: [
        {
          value: 9, // 值
          title: '我是小叔', // 标题
          text: '小叔', // 文本
        },
        {
          value: 10, // 值
          title: '我是大叔', // 标题
          text: '大叔', // 文本
        },
      ],
    },
  ],
};
[
  new QuickFormFactory({
    label: '族谱',
    name: 'tree1',
    require: true,
    tree: this.tree,
  }).checkboxTree(),
  new CheckboxTreeModelFactory({
    label: '族谱',
    name: 'tree2',
    tree: this.tree,
  }).instance(),
  {
    label: '树',
    name: 'tree3',
    tree: this.tree,
    type: 'checkbox-tree',
    value: [2],
    help: 'this is a demo',
    max: 11,
    min: 2,
    order: 1,
    require: true,
    validator: '',
  },
],
```

- 实例化`TextAreaModel`

```
[
  new QuickFormFactory({
    label: '文本域',
    min: 3,
    name: 'desc-1',
    value: '哈啊哈',
  }).textArea(),
  new TextAreaModelFactory({
    rows: 10,
    label: '描述',
    max: 255,
    name: 'desc-2',
  }).instance(),
  {
    label: '简介',
    name: 'desc-3',
    type: 'text-area',
    value: '气球是怎么飞起来的呢？',
    disabled: true,
    help: 'this is a text area',
    max: 255,
    min: 0,
    order: 1,
    placeholder: '',
    validator: '',
  },
],
```

- 实例化`DatePickerModel`

```
[
  new QuickFormFactory({
    clear: true,
    label: '日期时间',
    name: 'date-time-1',
    now: true,
    require: true,
    value: '哈啊哈',
  }).datePicker(),
  new DatePickerModelFactory({
    disabled: true,
    label: '日期时间',
    name: 'date-time-2',
    value: '2018-12-12 09:00:09',
  }).instance(),
  {
    label: '日期时间',
    name: 'datet-time-3',
    type: 'date-picker',
    value: '',
    disabled: false,
    format: 'YYYY/MM/DD',
    help: 'this is a date picker',
    kind: 'date',
    order: 1,
    placeholder: '',
    validator: '',
  },
],
```

- 实例化`CKEditorModel`

```
[
  new QuickFormFactory({
    label: '内容',
    name: 'content-1',
  }).ckEditor(),
  new CKEditorModelFactory({
    label: '内容',
    name: 'content-2',
    value: '<h1>那俩和</h1><center>是我的怎么了</center><blockquote><p>这么神奇吗</p></blockquote>',
  }).instance(),
  {
    label: '内容',
    name: 'content-3',
    type: 'ck-editor',
    value: '<h1>那俩和</h1><center>是我的怎么了</center><blockquote><p>这么神奇吗</p></blockquote>',
    disabled: true,
    help: 'this is a editor',
    order: 1,
    validator: '',
  },
],
```

- 实例化`ImageModel`

```
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
  {
    id: 2,
    creation_time: '2018-12-25 13:00:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '童心绘',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/47910750-3628-4bd2-a1c0-b1da43d26a8a/original?ss=0&w=240&h=178&srotate=1',
  },
  {
    id: 3,
    creation_time: '2019-10-25 13:00:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '童心绘',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/95b7e001-c012-45c2-a9dc-8fa74f7cc626/original?ss=0&w=240&h=178&srotate=1',
  },
  {
    id: 4,
    creation_time: '2019-11-25 13:00:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '小主人',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/d0752e56-2c1d-43c0-a340-20abe51b6614/original?ss=0&w=154&h=130&srotate=1',
  },
  {
    id: 5,
    creation_time: '2019-03-21 13:00:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '春联',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/b243d003-947b-4385-8768-0bfa1bb7e926/original?ss=0&w=154&h=130&srotate=1',
  },
  {
    id: 6,
    creation_time: '2017-01-01 13:00:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '童心绘',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/b42b9181-cbee-4812-a172-0573019bceb9/original?ss=0&w=240&h=178&srotate=1',
  },
  {
    id: 7,
    creation_time: '2019-02-08 13:00:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '童心绘',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/ee5099ce-18f7-49f2-b2a1-628c4cd24f9a/original?ss=0&w=240&h=178&srotate=1',
  },
  {
    id: 8,
    creation_time: '2018-02-24 18:03:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '文化游学',
    topic: 'travel',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/e1c32b8a-12bb-477f-a4ac-85910c2bfd2c/original?ss=0&w=240&h=178&srotate=1',
  },
  {
    id: 9,
    creation_time: '2018-12-25 13:10:10',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '文化游学',
    topic: 'travel',
    type: 'image',
    url: 'http://www.shaimobao.com/uploadfile/2015/0804/20150804103950422.jpg',
  },
  {
    id: 10,
    creation_time: '2017-10-01 09:00:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '童心绘',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/1d1b2ca0-c919-4894-85d4-2ad7206adcee/original?ss=0&w=240&h=178&srotate=1',
  },
  {
    id: 11,
    creation_time: '2015-12-30 13:00:00',
    file_name: 'certificate.jpg',
    size: 1024,
    tag: [],
    title: '文化寻宝',
    topic: 'game',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/7504f4d0-7ff4-4c66-b42b-d9bf4e08ebb4/original?ss=0&w=242&h=178&srotate=1',
  },
  {
    id: 12,
    creation_time: '2017-01-01 13:00:00',
    file_name: 'girl.jpg',
    size: 656,
    tag: [],
    title: '名媛秀',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/cc4e08f4-7625-4d38-ae38-660ba3331100/original',
  },
  {
    id: 13,
    creation_time: '2017-12-22 11:00:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '童心绘',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/2a1f36c4-bb57-4984-98e5-850e21fb20c8/original?ss=0&w=240&h=178&srotate=1',
  },
  {
    id: 14,
    creation_time: '2018-01-01 00:00:00',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '同根同源',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/b2ff8a36-7fc9-4f6d-bbd7-703705fd7a70/thumb',
  },
  {
    id: 15,
    creation_time: '2011-11-14 10:40:40',
    file_name: 'hello.jpg',
    size: 1024,
    tag: [],
    title: '同根同源',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/2a27f8f5-28f2-4144-a2ff-96e89a22456c/thumb',
  },
  {
    id: 16,
    creation_time: '2019-07-01 09:30:00',
    file_name: 'check.jpg',
    size: 1024,
    tag: [],
    title: '同根同源',
    topic: 'news',
    type: 'image',
    url: 'http://shaimobao-10002753.image.myqcloud.com/shaimobao-10002753/0/9145657b-9610-40f1-9d4a-4e30c0f49002/thumb',
  },
];
[
  new QuickFormFactory({
    display: 'input',
    label: '图片',
    multiple: false,
    name: 'image-1',
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: '1949vx44zmVlndq4V9K9NeMgUX8WohaV/H+gBDFebNUTg0ufIg5t',
      url: '/api/upload/image',
    },
  }).image(),
  new ImageModelFactory({
    crawlConfig: {
      api: '/api/index/index/save',
      additionalParameter: {
        type: 'image',
        'app-key': 'sssssdddddddgg'
      },
      headers: {
        'Token': '85e4BvPZrX3O0VxWPrA6zvsdZh0tmy8aeeWjNkCAdUICLTY5AmXH',
        'App-Key': 'sssssdddddddgg',
      },
      queueLimit: 3,
    },
    display: 'input',
    label: '缩略图',
    list: this.images,
    max: 5,
    multiple: true,
    name: 'image-2',
    searchConfig: {
      headers: {
        'Token': '85e4BvPZrX3O0VxWPrA6zvsdZh0tmy8aeeWjNkCAdUICLTY5AmXH',
        'App-Key': 'sssssdddddddgg',
      },
      mode: 'async',
      queueLimit: 3,
    },
    uploadConfig: {
      additionalParameter: {
        tag: '七棵菜',
        title: '春雨润物细无声',
        topic: '自然',
        'app-key': 'sssssdddddddgg'
      },
      authTokenHeader: 'Token',
      authToken: '1949vx44zmVlndq4V9K9NeMgUX8WohaV/H+gBDFebNUTg0ufIg5t',
      queueLimit: 3,
      url: '/api/upload/image',
    },
    value: '',
  }).instance(),
  {
    label: '封面',
    name: 'image-3',
    type: 'image',
    value: [{url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1134499892,439572153&fm=26&gp=0.jpg', title: 'demo'}],
    disabled: true,
    help: 'this is a image',
    order: 1,
    validator: '',
  },
],
```

- 实例化`SpreadsheetModel`

```
[
  new QuickFormFactory({
    label: '文件',
    name: 'spreadsheet-1',
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: '1783I6aYyiOnL23yB2YJpZfODV3PTosYelfppTHaGh+MB9MQA87u',
      url: '/api/upload/spreadsheet',
    },
  }).spreadsheet(),
  new SpreadsheetModelFactory({
    label: '题库',
    max: 5,
    multiple: true,
    name: 'spreadsheet-2',
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: '1949vx44zmVlndq4V9K9NeMgUX8WohaV/H+gBDFebNUTg0ufIg5t',
      queueLimit: 3,
      url: '/api/upload/spreadsheet',
    },
    value: '',
  }).instance(),
  {
    label: '导入',
    name: 'spreadsheet-3',
    type: 'spreadsheet',
    value: '',
    help: 'this is a spreadsheet',
    order: 1,
    validator: '',
  },
],
```

- 实例化`PopupRadioModel`

```
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
[
  new PopupRadioModelFactory({
    label: '选项',
    name: 'radio-1',
    options: this.options,
    searchConfig: {
      conditions: [
        { text: 'ID', type: 'input', value: 'id' },
        { text: '选项', type: 'drop-down', value: 'gender', options: [
          { text: 'A', value: 'A', title : '选项A', items: '99+' },
          { text: 'B', value: 'B', title : '选项B' },
          { text: 'C', value: 'C', title : '选项C' },
        ] }
      ],
    },
    value: '',
  }).instance(),
  new QuickFormFactory({
    label: '吃的',
    name: 'radio-2',
    options: this.options,
    searchConfig: {
      conditions: [
        { text: 'ID', type: 'input', value: 'id' },
        { text: '选项', type: 'drop-down', value: 'gender', options: [
          { text: 'A', value: 'A', title : '选项A', items: '99+' },
          { text: 'B', value: 'B', title : '选项B' },
          { text: 'C', value: 'C', title : '选项C' },
        ] }
      ],
      mode: 'async',
    },
    value: '',
  }).popupRadio(),
  {
    label: '内容',
    name: 'radio-3',
    type: 'popup-radio',
    value: 1,
    disabled: true,
    help: 'this is a radio',
    order: 1,
    validator: '',
    text: '就是这么神奇',
  },
],
```

- 实例化`PopupCheckboxModel`

```
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
[
  new PopupCheckboxModelFactory({
    label: '场馆',
    min: 1,
    max: 3,
    name: 'checkbox-1',
    options: this.options,
    searchConfig: {
      conditions: [
        { text: 'ID', type: 'input', value: 'id' },
        { text: '选项', type: 'drop-down', value: 'gender', options: [
          { text: 'A', value: 'A', title : '选项A', items: '99+' },
          { text: 'B', value: 'B', title : '选项B' },
          { text: 'C', value: 'C', title : '选项C' },
        ] },
      ],
    },
    value: '',
  }).instance(),
  new QuickFormFactory({
    label: '场馆',
    name: 'checkbox-2',
    require: true,
    searchConfig: {
      conditions: [
        { text: 'ID', type: 'input', value: 'id' },
        { text: '选项', type: 'drop-down', value: 'gender', options: [
          { text: 'A', value: 'A', title : '选项A', items: '99+' },
          { text: 'B', value: 'B', title : '选项B' },
          { text: 'C', value: 'C', title : '选项C' },
        ] },
      ],
      mode: 'async',
    },
    value: '',
  }).popupCheckbox(),
  {
    label: '内容',
    name: 'checkbox-3',
    type: 'popup-checkbox',
    value: [1],
    disabled: true,
    help: 'this is a editor',
    order: 1,
    validator: '',
    options: [],
    text: {1: '就是这么神奇'},
  },
],
```

- 实例化`PopupTreeModel`

```
data = [
  {
    data: { value: 'Projects', text: '1.8 MB', items: 5, title: 'dir' },
    children: [
      { data: { value: 'project-1.doc', title: 'doc', text: '240 KB' } },
      { data: { value: 'project-2.doc', title: 'doc', text: '290 KB' } },
      { data: { value: 'project-3', title: 'txt', text: '466 KB' } },
      { data: { value: 'project-4.docx', title: 'docx', text: '900 KB' } },
    ],
  },
  {
    data: { value: 'Reports', title: 'dir', text: '400 KB', items: 2 },
    children: [
      { data: { value: 'Report 1', title: 'doc', text: '100 KB' } },
      { data: { value: 'Report 2', title: 'doc', text: '300 KB' } },
    ],
  },
  {
    data: { value: 'Other', title: 'dir', text: '109 MB', items: 2 },
    children: [
      { data: { value: 'backup.bkp', title: 'bkp', text: '107 MB' } },
      { data: { value: 'secret-note.txt', title: 'txt', text: '2 MB' } },
    ],
  },
];
[
  new QuickFormFactory({
    label: '树',
    name: 'tree-1',
    mode: 'async',
    value: 6,
    text: '蛇',
  }).popupTree(),
  new PopupTreeModelFactory({
    label: '树',
    tree: this.data,
    name: 'tree-2',
    value: 'Other',
    text: '109 MB',
  }).instance(),
  {
    label: '只读树',
    name: 'tree-3',
    type: 'popup-tree',
    value: 'demo',
    disabled: true,
    help: 'this is a tree',
    order: 1,
    validator: '',
    text: '老鼠',
  },
],
```

- 实例化`ItemListModel`

```
[
  new QuickFormFactory({
    label: '场馆',
    name: 'item-1',
    value: null,
  }).itemList(),
  new ItemListModelFactory({
    label: '选项',
    name: 'item-2',
    value: 'Other',
    attributes: [
      { text: '编号', value: 'id', type: 'input' },
      { text: '名称', value: 'name', type: 'input' },
      { text: '性别', value: 'gender', type: 'drop-down', options: [
        { text: '选项A', value: 'A', title : '选项A', items: '99+' },
        { text: '选项B', value: 'B', title : '选项B' },
      ] },
      { text: '学校', value: 'school', type: 'drop-down-filter', options: [
        { text: '选项A', value: 'A', title : '选项A', items: '99+' },
        { text: '选项B', value: 'B', title : '选项B' },
        { text: '选项C', value: 'C', title : '选项C' },
        { text: '选项D', value: 'D', title : '选项D' },
        { text: '选项E', value: 'E', title : '选项E' },
      ] },
    ],
  }).instance(),
  {
    label: '只读选项',
    name: 'item-3',
    type: 'item-list',
    value: [{id: '1', name: 'demo'}, {id: '2', name: 'demo-2'}],
    disabled: true,
    help: 'this is a tree',
    order: 1,
    validator: '',
    attributes: [
      { text: '编号', value: 'id', type: 'input' },
      { text: '名称', value: 'name', type: 'input' },
    ],
  },
],
```

- 实例化`passwordBoxModel`

```
[
  new PasswordBoxModelFactory({
    label: '密码',
    name: 'password-1',
    require: true,
    min: 3,
  }).instance(),
  new QuickFormFactory({
    label: '验证码',
    name: 'password-2',
    max: 10,
  }).passwordBox(),
  {
    label: '密钥',
    name: 'password-3',
    type: 'password-box',
    value: '111',
    help: 'this is a password',
    order: 1,
    validator: 'inputEqual',
    visible: true,
  },
],
```

- 实例化`linkageBoxModel`

```
tree: any = {
  options: [
    { text: '选项A', value: 'A', parent : 0 },
    { text: '选项B', value: 'B', parent : 0 },
    { text: '选项C', value: 'C', parent : 0 },
  ],
  selected: 'B', // 选中的值
  root: 0,
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
[
  new LinkageBoxModelFactory({
    label: '族谱',
    name: 'zupu-1',
    require: true,
    tree: tree,
  }).instance(),
  new QuickFormFactory({
    label: '族谱',
    name: 'zupu-2',
    tree: tree,
  }).passwordBox(),
  {
    label: '族谱',
    name: 'zupu-3',
    type: 'linkage-box',
    value: ['111'],
    help: 'this is a password',
    order: 1,
    tree: tree,
  },
],
```


- 实例化`videoModel`

```
[
  new QuickFormFactory({
    label: '多媒体',
    multiple: false,
    name: 'video-1',
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: '1949vx44zmVlndq4V9K9NeMgUX8WohaV/H+gBDFebNUTg0ufIg5t',
      url: '/api/upload/video',
    },
  }).video(),
  new VideoModelFactory({
    label: '视频',
    max: 5,
    multiple: true,
    name: 'video-2',
    uploadConfig: {
      additionalParameter: {
        tag: '七棵菜',
        title: '春雨润物细无声',
        topic: '自然',
        'app-key': '123'
      },
      authTokenHeader: 'Token',
      authToken: '1949vx44zmVlndq4V9K9NeMgUX8WohaV/H+gBDFebNUTg0ufIg5t',
      queueLimit: 3,
      url: '/api/upload/video',
    },
    value: '',
  }).instance(),
  {
    label: '音频',
    name: 'video-3',
    type: 'video',
    value: [{url: 'https://ss1.bdstatic.com/test.mp4', title: 'demo'}],
    disabled: true,
    help: 'this is a video',
    order: 1,
    validator: '',
  },
],
```

- 实例化`KeywordModel`

```
[
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
    help: 'this is a keyword',
    order: 1,
    validator: '',
    readonly: true,
  },
],
```

- 实例化`FileModel`

```
[
  new QuickFormFactory({
    label: '文件',
    name: 'file-1',
    kind: ['json', 'xls'],
  }).file(),
  new FileModelFactory({
    label: '附件',
    name: 'file-2',
    disabled: false,
    accept: 'audio/*,text/plain',
  }).instance(),
  {
    label: '附件',
    name: 'file-3',
    type: 'file',
    help: 'this is a file',
    order: 1,
    validator: '',
    readonly: true,
    kind: ['pdf', 'word'],
  },
],
```

- 实例化`UEditorModel`

```
[
  new QuickFormFactory({
    label: '富文本内容',
    name: 'content-body-2',
    kind: 'classic',
    editorConfig: {
      token: '33567clZ3oAzAMzlFq5JvCwXxwvL1G9RxtjXox7ZkuC2cGSDaZv0',
      app-key: '237928374',
    },
  }).uEditor(),
  new UEditorModelFactory({
    label: '内容',
    name: 'content-body-2',
    value: '<h1>那俩和</h1><center>是我的怎么了</center><blockquote><p>这么神奇吗</p></blockquote>',
  }).instance(),
  {
    label: '内容',
    name: 'content-body-3',
    type: 'u-editor',
    value: '<h1>那俩和</h1><center>是我的怎么了</center><blockquote><p>这么神奇吗</p></blockquote>',
    disabled: true,
    help: 'this is a editor',
    order: 1,
    validator: '',
  },
],
```

- 实例化`MdEditorModel`

```
[
  new QuickFormFactory({
    label: '富文本内容',
    name: 'content-code-1',
    value: '',
  }).mdEditor(),
  new MdEditorModelFactory({
    label: '内容',
    name: 'content-code-2',
    value: '<h1>那俩和</h1><center>是我的怎么了</center><blockquote><p>这么神奇吗</p></blockquote>',
    editorConfig: {
      readOnly: true,
      imageUploadURL: '/api/access/tool.mdeditor/image?token=123&app-key=239487',
    },
  }).instance(),
  {
    label: '内容',
    name: 'content-body-3',
    type: 'md-editor',
    value: '<h1>那俩和</h1><center>是我的怎么了</center><blockquote><p>这么神奇吗</p></blockquote>',
    disabled: true,
    help: 'this is a editor',
    order: 1,
    validator: '',
  },
],
