/**
 * Function written for Google Sheets. Accepts a single cell or a column of cells and outputs the same.
 *
 * Strips non-numbers from multiplier, then finds the product of that and any numbers in the input cell or column.
 * Strings in the input are ignored during operation and preserved. Rounds to two decimal places.
 *
 * @param {string|Array<string>|number|Array<number>} input - The value or range of cells to be multiplied
 * @param {string|number} multiplier
 * @return - Any numbers in the input multiplied by the multiple, with strings preserved in between
 * @customfunction
 */
function multiplyAndPreserve(input, multiplier) {
  if (!multiplier) {
    return input;
  }
  if (!input) {
    return [];
  }
  const sanitizedMultiplier =
    typeof multiplier === "number"
      ? multiplier
      : parseFloat(multiplier.replace(/[^\d.]/g, ""));
  if (!sanitizedMultiplier) {
    return null;
  }
  const inputList = Array.isArray(input) ? input : [input];
  //TODO: Handle 2d arrays
  return inputList.map((value) => {
    const segments = value.toString().match(/\D+|\d*\.?\d+/g);
    return segments === null
      ? null
      : segments
          .map((segment) =>
            /^\d*\.?\d+$/.test(segment)
              ? (
                  Math.round(parseFloat(segment) * sanitizedMultiplier * 100) /
                  100
                ).toString()
              : segment
          )
          .join("");
  });
}
