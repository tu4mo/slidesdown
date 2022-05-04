module.exports = {
  customSyntax: '@stylelint/postcss-css-in-js',
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
  ],
  rules: {
    'function-no-unknown': null,
  },
}
