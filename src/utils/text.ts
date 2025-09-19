/**
 * Converts a number or a string containing numbers to a locale-specific format.
 *
 * @param {string | number} text - The text or number to be converted.
 * @param {string} language - The locale language code (e.g., 'en-US', 'ar-EG').
 * @param {boolean} [useGrouping=false] - Whether to use grouping separators, such as thousands separators. Defaults to `false`.
 * @returns {string} - The locale-formatted string.
 */
export const toLocale = (
  text: string | number,
  language: string,
  useGrouping: boolean = false,
): string =>
  typeof text === 'number'
    ? text.toLocaleString(language, {
        useGrouping,
      })
    : text.replace(/\d/g, num =>
        parseInt(num, 10).toLocaleString(language, {
          useGrouping,
        }),
      )
