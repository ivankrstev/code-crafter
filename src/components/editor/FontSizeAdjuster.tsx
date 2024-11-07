interface FontSizeAdjusterProps {
  fontSize: number;
  setFontSize: (value: ((prev: number) => number)) => void;
}

export default function FontSizeAdjuster({
  fontSize,
  setFontSize,
}: FontSizeAdjusterProps) {
  const increaseFontSize = () => setFontSize((prev) => prev + 1);
  const decreaseFontSize = () => setFontSize((prev) => Math.max(1, prev - 1));

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Font size:</span>
      <button
        onClick={decreaseFontSize}
        className="rounded px-2.5 py-1.5 hover:bg-black/10 dark:hover:bg-white/10"
      >
        -
      </button>
      <span className="font-mono">{fontSize}px</span>
      <button
        onClick={increaseFontSize}
        className="rounded px-2.5 py-1.5 hover:bg-black/10 dark:hover:bg-white/10"
      >
        +
      </button>
    </div>
  );
}
