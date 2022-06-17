# SevenFoodForm

This project has a angular module of dynamic form based on [nebular](https://github.com/akveo/nebular).

## install

- get package from npm.

```
npm install seven-food-form
```

- import the module

```
import { SfDynamicFormModule } from 'seven-food-form';

@NgModule({
  imports: [
    SfDynamicFormModule.forRoot(),
  ],
})
```

- set the models in .ts like below

```
import { QuickFormFactory } from 'seven-food-form';

models = [{
    items: [
      new QuickFormFactory({
        label: '颜色',
        name: 'color',
        type: 'radio',
        options: [
          { text: '红色', value: 'red', title : '一种颜色', items: 1 },
          { text: '绿色', value: 'green', title : '大自然的颜色', items: 1000 },
        ],
        value: 'red',
      }).radio(),
    ],
  }];
```

- use in template

```
<ngx-dynamic-form [models]="models"></ngx-dynamic-form>
```

   input attribute:
   
   1. models
   2. loading
   3. layout

   output attribute:

   1. formSubmit
   2. formReset

## form model

You can get form model details from [src\app\dynamic-form\READEME.md](https://github.com/jinxiu3939/seven-food-form/tree/master/src/app/modules/dynamic-form)

and the form model demo from [src\app\dynamic-form\DEMO.md](https://github.com/jinxiu3939/seven-food-form/blob/master/src/app/modules/dynamic-form/DEMO.md)

## deploy

remove the package

```
  "dependencies": {
    "@angular/animations": "^8.2.14",
    "@angular/cdk": "^8.2.3",
    "@angular/common": "~8.2.14",
    "@angular/compiler": "~8.2.14",
    "@angular/core": "~8.2.14",
    "@angular/forms": "~8.2.14",
    "@angular/platform-browser": "~8.2.14",
    "@angular/platform-browser-dynamic": "~8.2.14",
    "@angular/router": "~8.2.14",
    "@ckeditor/ckeditor5-angular": "^1.2.3",
    "@ckeditor/ckeditor5-build-balloon-block": "^17.0.0",
    "@nebular/eva-icons": "^4.6.0",
    "@nebular/theme": "^4.6.0",
    "bootstrap": "^4.3.1",
    "eva-icons": "^1.1.3",
    "jquery": "^3.6.0",
    "lodash": "^4.17.15",
    "ng2-file-upload": "^1.4.0",
    "ngx-ueditor": "^2.1.3",
    "rxjs": "~6.4.0",
    "tslib": "^1.10.0",
    "xlsx": "^0.15.5",
    "zone.js": "~0.9.1"
  },
```

## dependencies

The important thing is your project is from nebular.
- [how install nebular](https://akveo.github.io/nebular/docs/guides/install-nebular#install-nebular)
- [create nebular page](https://akveo.github.io/nebular/docs/guides/create-nebular-page#create-nebular-page)
