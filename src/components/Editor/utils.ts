interface Slide {
  slide: number
  firstLine: number
}

export function getCurrentLineNumber(value: string, cursorPosition: number) {
  return value.substr(0, cursorPosition).split('\n').length
}

export function getSlidesFirstLines(value = ''): Slide[] {
  return value
    .split('\n')
    .reduce(
      (prev, curr, index) => (curr === '---' ? [...prev, index + 1] : prev),
      [0],
    )
    .map((lines, index) => ({ slide: index, firstLine: lines }))
}

export function getCurrentSlide(
  slides: Slide[],
  currentLineNumber: number,
): number {
  const slideObj = [...slides]
    .reverse()
    .find((slide) => currentLineNumber > slide.firstLine)

  return slideObj?.slide ?? 0
}
