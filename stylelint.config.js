export default {
  extends: ['stylelint-config-recommended'],
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
  rules: {
    'function-no-unknown': null,
    'media-query-no-invalid': null,
    'nesting-selector-no-missing-scoping-root': null,
  },
}
