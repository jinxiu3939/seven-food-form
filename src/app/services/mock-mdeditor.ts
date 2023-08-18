import {
  QuickFormFactory,
  MdEditorModelFactory,
} from '../modules/dynamic-form';

export const mdeditorModels: any = [
  new QuickFormFactory({
    label: '富文本内容',
    name: 'content-body-3',
    value: '```hello```',
    editorConfig: {
      readOnly: false,
      imageUploadURL: '/api/access/tool.mdeditor/image?token=123&app-key=239487',
    },
    // height: 400,
    readonly: true,
  }).mdEditor(),
//   new MdEditorModelFactory({
//     label: '内容',
//     name: 'content-body-2',
//     value: `<h1>那俩和</h1><center>是我的怎么了</center><blockquote><p>这么神奇吗</p></blockquote>//,textarea:'editorValue' // 提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时可以给容器name属性，会将name给定的值最为每个实例的键值，不用每次实例化的时候都设置这个值

//     //,initialContent:'欢迎使用ueditor!'    //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子

//     //,autoClearinitialContent:true //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
// `,
//     // disabled: true,
//     max: 12,
//   }).instance(),
];
