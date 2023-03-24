import { Component, Input } from '@angular/core';
import { NbTreeGridPresentationNode } from '@nebular/theme';

import { TreeNode, Option } from '../../../dynamic-form.options';

@Component({
  selector: 'sff-tree-node-icon',
  template: `
    <nb-tree-grid-row-toggle *ngIf="isDir();" [expanded]="expanded">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class TreeNodeIconComponent {
  @Input() row: NbTreeGridPresentationNode<TreeNode<Option<string | number>>>;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.row.hasChildren();
  }
}
