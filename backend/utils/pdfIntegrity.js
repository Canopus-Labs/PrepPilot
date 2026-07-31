const { PDFParse } = require("pdf-parse");

const PDF_MAGIC_BYTES = "%PDF-";
const AVERAGE_READING_WPM = 200; 


class PdfIntegrityError extends Error {
  constructor(message) {
    super(message);
    this.name = "PdfIntegrityError";
  }
}

/**
 *
 * @param {Buffer} buffer
 * @returns {Promise<{ numPages: number, wordCount: number, charCount: number, isLikelyScanned: boolean }>}
 * @throws {PdfIntegrityError} If the buffer isn't a real, readable PDF.
 */
async function inspectPdfBuffer(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    throw new PdfIntegrityError("The uploaded file is empty or unreadable.");
  }

  const header = buffer.subarray(0, 5).toString("latin1");
  if (header !== PDF_MAGIC_BYTES) {
    throw new PdfIntegrityError(
      "This file doesn't look like a valid PDF (missing PDF header)."
    );
  }

  let parser;
  try {
    parser = new PDFParse({ data: buffer });
    const info = await parser.getInfo();
    const textResult = await parser.getText();

    const numPages = Math.max(1, info?.total || 1);
    const text = textResult?.text || "";
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charCount = text.length;

    const isLikelyScanned = wordCount < numPages * 20;

    return { numPages, wordCount, charCount, isLikelyScanned };
  } catch (err) {
    if (err instanceof PdfIntegrityError) throw err;
    throw new PdfIntegrityError(
      "The PDF appears to be corrupted, encrypted, or unreadable."
    );
  } finally {
    if (parser) {
      try {
        await parser.destroy();
      } catch {
      }
    }
  }
}

/**
 * @param {{ numPages: number, wordCount: number, isLikelyScanned: boolean }} stats
 * @returns {{ minutes: number, label: string, pages: number }}
 */
function computeReadingTime({ numPages, wordCount, isLikelyScanned }) {
  const minutes = isLikelyScanned || wordCount === 0
    ? Math.max(3, Math.round(numPages * 2.2))
    : Math.max(3, Math.round(wordCount / AVERAGE_READING_WPM));

  const label =
    minutes >= 60
      ? `${Math.floor(minutes / 60)} hr ${minutes % 60} min`
      : `${minutes} min`;

  return { minutes, label, pages: numPages };
}

module.exports = { inspectPdfBuffer, computeReadingTime, PdfIntegrityError };