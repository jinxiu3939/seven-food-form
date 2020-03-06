# SevenFoodForm

This project has a angular module of dynamic form based on [nebular](https://github.com/akveo/nebular).

## install

- get package from npm.

```
npm install seven-food-form
```

- import the module

```
import { SfDynamicFormModule } from './seven-food-form/dynamic-form.module';

@NgModule({
  imports: [
    SfDynamicFormModule,
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
   2. submitting
   3. layout

   output attribute:

   1. formSubmit
   2. formReset

## form model

You can get form model details from `src\app\dynamic-form\READEME.md`

and the form model demo from `src\app\dynamic-form\DEMO.md`

## dependencies

The important thing is your project is from nebular.
[how install nebular](https://akveo.github.io/nebular/docs/guides/install-nebular#install-nebular)
[create nebular page](https://akveo.github.io/nebular/docs/guides/create-nebular-page#create-nebular-page)
