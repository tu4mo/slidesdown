export const getCurrentLineNumber = (value, cursorPosition) =>
  value.substr(0, cursorPosition).split('\n').length
