import { InjectionToken, EventEmitter } from '@angular/core';

export const SF_CONTROL_RESET = new InjectionToken<EventEmitter<void>>('SF_CONTROL_RESET');
