/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-prettier'],
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-html'], // 扩展现有配置
  rules: {
    'prettier/prettier': true, // 作为 Stylelint 规则运行 Prettier
    'block-no-empty': true, //禁止空块，比如 a{ }
    'max-nesting-depth': 3, // 限制嵌套层数
    'no-empty-source': null,
    'import-notation': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'use',
          'mixin',
          'include',
          'extend',
        ],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue/scss'],
    },
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
      customSyntax: 'postcss-html',
      extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
    '**/*.yml',
    '**/*.d.ts',
  ],
};
