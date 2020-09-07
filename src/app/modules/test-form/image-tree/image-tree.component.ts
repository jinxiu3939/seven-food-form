import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

/**
 * 多选节点树
 */
export interface CheckBoxTree<T> {
  text: string; // 文本
  value: T; // 值
  checked?: boolean; // 是否选中
  children?: CheckBoxTree<T>[]; // 子元素
  items?: number; // 元素数量
  title?: string; // 标题
}

@Component({
  selector: 'ngx-image-tree',
  templateUrl: './image-tree.component.html',
  styleUrls: [
    './image-tree.component.scss',
  ],
})
export class ImageTreeComponent implements OnInit {

  @Input() public tree: CheckBoxTree<number | string>; // 选项树，显示树形目录结构

  expandChildren: boolean = true;
  arrowIcon: string = 'arrowhead-up-outline';

  ngOnInit() {
  }

  expand() {
    this.expandChildren = !this.expandChildren;
    if (this.expandChildren) {
      this.arrowIcon = 'arrowhead-up-outline';
    } else {
      this.arrowIcon = 'arrowhead-down-outline';
    }
  }

  delete() {}

}
