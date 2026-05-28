import { AbstractControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';

export interface SfControl {
  control: AbstractControl | null;
  reset(): void;
}

export interface SfControlWithEmitter extends SfControl {
  resetEvent?: EventEmitter<void>;
}
