// Adds `,` every three numbers from the left. Theoretically correctly
export function formatNumToDecimalString(x: number, decimalPlaces: number = 2): string {
  return x.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Safe way to add floats in JS
export function jsDecimalSum(a: number, b: number, decimalPlaces: number = 2): number {
  // export const jsDecimalSum = (a: number, b: number, decimalPlaces: number = 2): number => {
  const factor = Math.pow(10, decimalPlaces);
  const numA = parseFloat(a.toFixed(decimalPlaces));
  const numB = parseFloat(b.toFixed(decimalPlaces));
  return (numA * factor + numB * factor) / factor;
}
