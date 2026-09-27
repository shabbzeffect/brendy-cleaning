export const currency = {
  code: "KES",
  symbol: "KSh",
  locale: "en-KE",
} as const;

// Grouping only, no currency style: the CLDR symbol for KES differs between ICU
// versions ("Ksh" in Node, "KSh" in some browsers), which would hand React a
// server/client text mismatch on every price. The symbol is ours, the digits are Intl's.
const digits = new Intl.NumberFormat(currency.locale, {
  maximumFractionDigits: 0,
});

/** "KSh 9,500" — no cents, because nobody quotes bob in Kenya. */
export const formatMoney = (amount: number): string =>
  `${currency.symbol} ${digits.format(amount)}`;

export const formatCount = (value: number): string => digits.format(value);
