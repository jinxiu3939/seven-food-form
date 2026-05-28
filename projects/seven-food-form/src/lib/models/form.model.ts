export interface SfFormModel {
  type: string;
  name: string;
}

export interface SfFormConfig {
  submitButtonText?: string;
  resetButtonText?: string;
  showReset?: boolean;
}

export interface SfControlEvent {
  type: 'change' | 'blur' | 'focus';
  key: string;
  value: any;
}
