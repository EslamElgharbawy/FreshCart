type HighlightTextProps = {
  text: string;
  search: string;
};

export default function HighlightText({
  text,
  search,
}: HighlightTextProps) {
  const normalizedText = text.toLowerCase().replace(/\s+/g, "");

  const normalizedSearch = search
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  if (!normalizedSearch) {
    return <>{text}</>;
  }

  const matchStart = normalizedText.indexOf(normalizedSearch);

  if (matchStart === -1) {
    return <>{text}</>;
  }

  let normalizedIndex = 0;
  let startIndex = -1;
  let endIndex = -1;

  for (let i = 0; i < text.length; i++) {
    if (!/\s/.test(text[i])) {
      if (normalizedIndex === matchStart) {
        startIndex = i;
      }

      if (
        normalizedIndex ===
        matchStart + normalizedSearch.length - 1
      ) {
        endIndex = i;
        break;
      }

      normalizedIndex++;
    }
  }

  return (
    <>
      {text.slice(0, startIndex)}

      <strong className="font-bold">
        {text.slice(startIndex, endIndex + 1)}
      </strong>

      {text.slice(endIndex + 1)}
    </>
  );
}