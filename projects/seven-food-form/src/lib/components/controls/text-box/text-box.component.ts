import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbInputModule } from '@nebular/theme';
import { SfTextBoxModel } from '../../../models/controls/text-box.model';

@Component({
  selector: 'sf-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NbInputModule]
})
export class SfTextBoxComponent {
  @Input() control!: FormControl;
  @Input() model!: SfTextBoxModel;
}
