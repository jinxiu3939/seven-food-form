import {
  QuickFormFactory,
  UEditorModelFactory,
} from '../modules/dynamic-form';

export const ueditorModels: any = [
  new QuickFormFactory({
    label: '富文本内容',
    name: 'content-body-3',
    value: '',
    editorConfig: {
      readOnly: false,
      imageUploadURL: '/api/access/tool.mdeditor/image?token=123&app-key=239487',
    },
    maximumWords: 40,
    max: 50,
    min: 33,
    allowDivTransToP: false,
    topOffset: 0,
    zIndex: 10000,
    require: true,
    autoFloatEnabled: false,
    retainOnlyLabelPasted: true,
  }).uEditor(),
  new UEditorModelFactory({
    label: '内容',
    name: 'content-body-2',
    value: `<h1>那俩和</h1><center>是我的怎么了</center><blockquote><p>这么神奇吗</p></blockquote>//,textarea:'editorValue' // 提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时可以给容器name属性，会将name给定的值最为每个实例的键值，不用每次实例化的时候都设置这个值

    //,initialContent:'欢迎使用ueditor!'    //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子

    //,autoClearinitialContent:true //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
`,
    initialFrameHeight: 400,
    autoHeightEnabled: false,
    lang: 'en',
    disabled: false,
    wordCount: false,
  }).instance(),
];
