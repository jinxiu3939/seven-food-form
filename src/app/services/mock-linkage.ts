export const tree: any = {
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