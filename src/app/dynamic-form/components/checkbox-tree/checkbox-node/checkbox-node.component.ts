import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { CheckBoxTree } from '../../../dynamic-form.options';

@Component({
  selector: 'ngx-checkbox-node',
  templateUrl: './checkbox-node.component.html',
  styleUrls: ['./checkbox-node.component.scss'],
})
export class CheckboxNodeComponent implements OnInit {

  @Input() public checked: any[]; // 选项值，节点树中选中的节点
  @Input() public disabled: boolean; // 是否禁用
  @Input() public tree: CheckBoxTree<number | string>; // 选项树，显示树形目录结构

  @Output() public checkedChange = new EventEmitter<any[]>(); // 选项改变事件

  ngOnInit() {
    this.tree.checked = this.checkChecked(this.tree.value);
  }

  /*
   * 监听子元素的节点变化，如果有变化冒泡通知父元素
   */
  notifyParent(checked: any[]) {
    /* 统计选中的子元素数量 */
    let checked_children = 0;
    this.tree.children.map(child => {
      if (checked.includes(child.value)) {
        checked_children++;
      }
    });
    /* 更新全选状态 */
    /* 全选状态不一致说明是子元素发起的点击事件需要处理 */
    /* 全选状态一致说明是当前元素发起的点击事件无需处理 */
    if (checked_children === this.tree.children.length) { // 子元素全选
      if (! this.tree.checked) { // 当前元素没有选中
        checked.push(this.tree.value); // 改变选中的值
        this.tree.checked = true; // 选中当前元素
      }
    } else { // 子元素未全选
      if (this.tree.checked) { // 当前元素已选中
        checked = checked.filter(item => item !== this.tree.value); // 改变选中的值
        this.tree.checked = false; // 取消选中当前元素
      }
    }
    this.checked = checked; // 保存选中的值
    this.checkedChange.emit(this.checked); // 通知父元素
  }

  /**
   * 更新当前节点选中状态
   * 刷新整棵树
   */
  switchChecked(checked: boolean) {
    this.setValue(checked, this.tree.value); // 更改选项值
    this.tree = this.reloadChildren(checked, this.tree); // 刷新子元素的树型结构
    this.checkedChange.emit(this.checked); // 冒泡通知父元素
  }

  /**
   * 刷新子元素的树型结构
   */
  private reloadChildren(checked: boolean, tree: CheckBoxTree<number | string>): CheckBoxTree<number | string> {
    this.tree.checked = checked;
    if (tree.children) {
      // 获取所有选中的值
      tree.children = tree.children.map(child => {
        this.setValue(checked, child.value); // 更改选项值，包含所有子元素
        child.checked = checked; // 改变子元素状态
        child = this.reloadChildren(checked, child); // 递归
        return child;
      });
    }
    return tree;
  }

  /**
   * 改变选中的值
   */
  private setValue(checked: boolean, value: string | number) {
    if (checked) { // 选中
      if (this.checkChecked(value) === false) {
        this.checked.push(value);
      }
    } else { // 取消
      if (this.checkChecked(value)) {
        this.checked = this.checked.filter(item => item !== value);
      }
    }
  }

  /**
   * 是否选中
   */
  private checkChecked(value: string | number): boolean {
    // 数字字符串和数字等同
    return this.checked && (this.checked.indexOf(value) > -1 || this.checked.indexOf(value + '') > -1);
  }

}
