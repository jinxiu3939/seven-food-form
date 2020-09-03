/**
 * excel上传
 * depends on ng2-file-upload and xlsx module
 */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { FileUploader } from 'ng2-file-upload';
import * as XLSX from 'xlsx';

import { SpreadsheetModel } from '../../dynamic-form.options';
import { ResourceProvider } from '../../providers/data/resource-provider';

type AOA = any[][];

@Component({
  selector: 'ngx-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss'],
})
export class SpreadsheetComponent implements OnInit {

  @Input() model: SpreadsheetModel;
  @Input() form: FormGroup;

  @ViewChild('dialog', {static: false}) dialog;

  table: AOA; // 电子表格内容
  loading: boolean;
  finished: boolean; // 校验是否有效
  status: string; // 状态

  public uploader: FileUploader;

  constructor(private dialogService: NbDialogService, private provider: ResourceProvider) {
    this.uploader = new FileUploader({});
    this.finished = false;
  }

  ngOnInit() {
    this.uploader.setOptions(this.model.uploadConfig);
    this.loading = false;
  }

  /*
   * 选择文件
   */
  selectedFileOnChanged(event: any) {
    if (this.uploader.queue.length === 0) {
      this.alert(`选择电子表格失败（类型错误/文件大小超过` + this.model.uploadConfig.maxFileSize / 1024 / 1024 + `M）`);
      return ;
    }
    /* wire up file reader */
    const target: DataTransfer = (event.target) as DataTransfer;
    if (target.files.length !== 1) {
      this.alert(`最多可以选择一个电子表格文件`);
      return ;
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const tmp_sheets = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as AOA; // 记录表单值
      if (tmp_sheets && tmp_sheets.length > 0) {
        if (this.model.header) { // 校验内容
          if (tmp_sheets[0].length !== this.model.header.length) {
            this.alert(`校验电子表格失败（电子表格列和模板不一致）`);
          } else {
            this.finished = true; // 可以上传
            this.table = tmp_sheets; // 保存电子表格
          }
        } else { // 不校验内容
          this.finished = true; // 可以上传
          this.table = tmp_sheets; // 保存电子表格
        }
      } else {
        this.alert(`读取电子表格失败（文件格式错误/内容为空）`);
      }
      this.loading = false;
    };
    reader.onerror = (e: any) => {
      this.alert(`电子表格校验失败（文件格式错误）`);
      this.loading = false;
    };
    reader.readAsBinaryString(target.files[0]); // 解析文件
    this.loading = true;
    this.status = 'info';
  }

  /*
   * 上传文件
   */
  uploadFile() {
    if (this.uploader.queue.length === 1) {
      const $this = this;
      this.uploader.queue[0].onSuccess = (response, status, headers) => {
        // 上传文件成功
        if (status === 200) {
          try {
            const tempRes = JSON.parse(response);
            const result = $this.provider.parseUploadResult(tempRes);
            if (result.error) {
              $this.alert(result.error);
            } else {
              $this.uploadFinish(result);
              $this.finished = false;
              $this.status = 'success';
              $this.alert(`上传成功`);
            }
          } catch (e) {
            $this.alert(`上传电子表格失败（系统维护中）`);
          }
        } else {
          $this.alert(`上传电子表格失败（文件尺寸太大/类型错误）`);
        }
        $this.loading = false;
      };
      this.uploader.queue[0].onError = (response, status, headers) => {
        if (status === 401) {
          $this.alert(`上传电子表格失败（授权异常）（可关闭浏览器重新打开）`);
        } else {
          $this.alert(`上传电子表格失败（系统繁忙）`);
        }
        $this.loading = false;
      };
      this.uploader.queue[0].upload(); // 只上传一个文件
      this.loading = true;
    }
  }

  alert(messge) {
    this.dialogService.open(this.dialog, { context: messge });
  }

  /**
   * 上传图片完成
   */
  private uploadFinish(content) {
    this.model.value = content.url != '' ? this.table : []; // 模型赋值
    this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
  }

}
