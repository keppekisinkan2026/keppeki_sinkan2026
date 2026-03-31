const mobileTextSegmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter("ja", { granularity: "word" })
    : null;

const prohibitedLineStartPattern = /^[、。。，．・：；！？!?」』）】〕〉》]+$/;

function segmentText(text: string) {
  if (!mobileTextSegmenter) {
    return Array.from(text);
  }

  return Array.from(mobileTextSegmenter.segment(text), ({ segment }) => segment);
}

function getTextLength(text: string) {
  return Array.from(text).length;
}

function normalizeParagraph(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("");
}

export function wrapParagraphForMobile(
  text: string,
  maxChars = 16,
  minChars = 4,
  allowShortLastLine = false,
) {
  const normalizedText = normalizeParagraph(text);
  const segments = segmentText(normalizedText);
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let currentLength = 0;

  segments.forEach((segment) => {
    if (!segment) {
      return;
    }

    const segmentLength = getTextLength(segment);
    const canAppend =
      currentLength === 0 ||
      currentLength + segmentLength <= maxChars ||
      prohibitedLineStartPattern.test(segment);

    if (canAppend) {
      currentLine.push(segment);
      currentLength += segmentLength;
      return;
    }

    lines.push(currentLine);
    currentLine = [segment];
    currentLength = segmentLength;
  });

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  for (let index = lines.length - 1; index > 0; index -= 1) {
    if (allowShortLastLine && index === lines.length - 1) {
      continue;
    }

    while (getTextLength(lines[index].join("")) < minChars) {
      const previousLine = lines[index - 1];
      if (previousLine.length <= 1) {
        break;
      }

      const movedSegment = previousLine.pop();
      if (!movedSegment) {
        break;
      }

      lines[index].unshift(movedSegment);
    }
  }

  return lines.map((line) => line.join(""));
}

export function wrapTextForMobile(
  text: string,
  maxChars = 16,
  minChars = 4,
  allowShortLastLine = false,
) {
  const normalizedText = text.trim();
  if (!normalizedText) {
    return [];
  }

  return normalizedText
    .split(/\n{2,}/)
    .map((paragraph) => wrapParagraphForMobile(paragraph, maxChars, minChars, allowShortLastLine))
    .filter((paragraph) => paragraph.length > 0);
}
