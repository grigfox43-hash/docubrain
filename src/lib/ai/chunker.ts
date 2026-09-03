export interface TextChunk {
  index: number;
  text: string;
  charCount: number;
}

/**
 * Splits text into chunks of roughly targetWords (~500-800 tokens) with overlap (~100 tokens).
 * Preserves paragraph and sentence boundaries wherever possible.
 */
export function chunkText(
  fullText: string,
  targetWords: number = 250,
  overlapWords: number = 40
): TextChunk[] {
  const clean = fullText.replace(/\r\n/g, "\n").trim();
  if (!clean) return [];

  // Split into paragraphs
  const paragraphs = clean.split(/\n\s*\n/);
  const chunks: TextChunk[] = [];

  let currentWords: string[] = [];
  let chunkIndex = 0;

  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/).filter(Boolean);
    if (!words.length) continue;

    // If paragraph itself is huge, split it by sentences
    if (words.length > targetWords * 1.5) {
      const sentences = para.match(/[^.!?]+[.!?]+(\s+|$)/g) || [para];
      for (const sent of sentences) {
        const sentWords = sent.trim().split(/\s+/).filter(Boolean);
        if (currentWords.length + sentWords.length > targetWords && currentWords.length > 0) {
          chunks.push({
            index: chunkIndex++,
            text: currentWords.join(" "),
            charCount: currentWords.join(" ").length,
          });
          // keep overlap
          currentWords = currentWords.slice(-overlapWords);
        }
        currentWords.push(...sentWords);
      }
    } else {
      if (currentWords.length + words.length > targetWords && currentWords.length > 0) {
        chunks.push({
          index: chunkIndex++,
          text: currentWords.join(" "),
          charCount: currentWords.join(" ").length,
        });
        currentWords = currentWords.slice(-overlapWords);
      }
      currentWords.push(...words);
    }
  }

  if (currentWords.length > 0) {
    chunks.push({
      index: chunkIndex++,
      text: currentWords.join(" "),
      charCount: currentWords.join(" ").length,
    });
  }

  return chunks;
}
