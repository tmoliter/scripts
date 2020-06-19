/**
 * Strips non-numbers from multiplier, then finds the product of that and any numbers in the input.
 * Strings in the input are ignored during operation and preserved. Rounds to two decimal places.
 *
 * @param {string|Array<string>|number|Array<number>} input - The value or range of cells to be multiplied
 * @param {string|number} multiple
 * @return - Any numbers in the input multiplied by the multiple, with strings preserved in between
 * @customfunction
 */
function multiplyAndPreserve(input, multiple) {
  if (!multiple) {
    return input;
  }
  if (!input) {
    return [];
  }
  const sanitizedMultiple =
    typeof multiple === "number"
      ? multiple
      : parseFloat(multiple.replace(/[^\d.]/g, ""));
  const inputList = !Array.isArray(input) ? [input] : input;
  return inputList.map((value) => {
    const segments = value.toString().match(/\D+|\d*\.?\d+/g);
    return segments === null
      ? null
      : segments
          .map((segment) =>
            /^\d*\.?\d+$/.test(segment)
              ? (
                  Math.round(parseFloat(segment) * sanitizedMultiple * 100) /
                  100
                ).toString()
              : segment
          )
          .join("");
  });
}
