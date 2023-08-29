import {
  Component,
  OnChanges,
  Output,
  Input,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

import { LinkageBoxTree, LinkageOption } from '../../../dynamic-form.options';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'sff-linkage-node',
  templateUrl: './linkage-node.component.html',
  styleUrls: [
    '../../../dynamic-form.component.scss',
    './linkage-node.component.scss',
  ],
})
export class LinkageNodeComponent implements OnChanges {

  @Input() public parent: number | string; // 父下拉框值
  @Input() public tree: LinkageBoxTree<number | string>; // 选项树，显示树形目录结构
  @Input() public disabled: boolean;
  @Input() public filterOptions: LinkageOption<(number | string)>[]; // 显示的选项

  @Output() public selectedChange = new EventEmitter<any[]>(); // 下拉框改变事件

  children: LinkageBoxTree<number | string>; // 子元素
  options: LinkageOption<(number | string)>[]; // 显示的选项
  lang: any;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'parent') {
        this.loadTree();
      } else if (propName === 'tree') {
        if (this.tree?.selected === '') {
          this.clearChildren();
        }
      } else if (propName === 'filterOptions') {
        if (!changes.filterOptions.firstChange && changes.filterOptions.currentValue) {
          this.options = changes.filterOptions.currentValue;
        }
      }
    }
  }

  /*
   * 监听子元素的节点变化，如果有变化冒泡通知父元素
   */
  notifyParent(selected: any[]) {
    const current = [this.tree.selected]; // 当前选中的值
    selected.forEach((item) => current.push(item));
    this.selectedChange.emit(current); // 通知父元素，当前值和子元素的值一起通知父元素
  }

  /**
   * 当前下拉框改变
   */
  switchSelected() {
    this.selectedChange.emit([this.tree.selected]); // 通知父元素，只保留当前下拉框的值，子下拉框清空
    this.clearChildren();
  }

  loadTree() {
    if (this.tree?.options && Array.isArray(this.tree.options)) {
      this.options = this.tree.options.filter((item) => item.parent === this.parent);
      if (this.options.length === 0) {
        this.tree.selected = '';
        this.clearChildren();
      }
    }
  }

  private clearChildren() {
    if (this.tree.children) {
      this.tree.children.selected = '';
    }
  }

}
