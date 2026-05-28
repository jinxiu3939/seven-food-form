import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbInputModule } from '@nebular/theme';
import { SfTextAreaModel } from '../../../models/controls/text-area.model';

@Component({
  selector: 'sf-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NbInputModule]
})
export class SfTextAreaComponent {
  @Input() control!: FormControl;
  @Input() model!: SfTextAreaModel;
}
