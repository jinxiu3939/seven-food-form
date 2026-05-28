import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // 全局忽略文件
  {
    ignores: [
      '**/dist/',
      '**/build/',
      '**/coverage/',
      '**/node_modules/',
      '**/.angular/',
      '**/*.spec.ts',  // 可根据需要调整
      '**/assets/',
    ],
  },

  // TypeScript 文件配置
  {
    files: ['projects/seven-food-form/**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: 'projects/seven-food-form/tsconfig.lib.json',  // 或 tsconfig.lint.json
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      '@angular-eslint': angular,
    },
    rules: {
      // 基础 ESLint 规则
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      eqeqeq: ['error', 'always'],

      // TypeScript 推荐规则
      // '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Angular 特定规则
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',

      // 组件选择器命名规范
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'sf',
          style: 'kebab-case',
        },
      ],

      // 指令选择器命名规范
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'sf',
          style: 'camelCase',
        },
      ],
    },
  },

  // HTML 模板文件配置
  {
    files: ['projects/seven-food-form/**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    rules: {
      // 模板基础规则
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': ['error', { allowNullOrUndefined: true }],
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',

      // 可访问性规则（推荐开启）
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/valid-aria': 'error',

      // 最佳实践
      '@angular-eslint/template/use-track-by-function': 'warn',
      '@angular-eslint/template/no-positive-tabindex': 'error',
    },
  },
];
