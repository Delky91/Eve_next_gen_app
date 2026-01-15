export function toRoman(num: number): string {
  if (num <= 0 || num > 100) return "";

  const romanMap: { value: number; symbol: string }[] = [
    { value: 1000, symbol: "M" },
    { value: 500, symbol: "D" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";
  let remaining = num;

  for (const { value, symbol } of romanMap) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
}
