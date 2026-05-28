import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SfUploadResult {
  success: boolean;
  url?: string;
  message?: string;
  data?: any;
}

export interface SfUploadService {
  upload(file: File, options?: any): Observable<SfUploadResult>;
  delete?(url: string): Observable<SfUploadResult>;
}

@Injectable({ providedIn: 'root' })
export class SfDefaultUploadService implements SfUploadService {
  upload(_file: File, _options?: any): Observable<SfUploadResult> {
    throw new Error('Upload service not implemented. Please provide a custom upload service.');
  }
}
