export const getCurrentLineNumber = (value, cursorPosition) =>
  value.substr(0, cursorPosition).split('\n').length

export const getSlidesFirstLines = (value = '') =>
  value
    .split('\n')
    .reduce(
      (prev, curr, index) => (curr === '---' ? [...prev, index + 1] : prev),
      [0]
    )
    .map((lines, index) => ({ slide: index, firstLine: lines }))

export const getCurrentSlide = (slides, currentLineNumber) => {
  const slideObj = [...slides]
    .reverse()
    .find(slide => currentLineNumber > slide.firstLine)

  return (slideObj && slideObj.slide) || 0
}
