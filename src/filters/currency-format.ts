const formats: CurrencyMap = {
  gbp: {
    symbol: '£',
  },
  eur: {
    symbol: '€',
  },
  usd: {
    symbol: '$',
  },
  cny: {
    symbol: '¥',
  },
};

const getChars = ({ currencyCode, locale }: ICurrencyOptions) => {
  // get separators based on locale
  // by default, locale is provided by UA
  // e.g. 1.1 => '1.1' => '.' for en-GB locale
  const decimalSeparator = (1.1).toLocaleString(locale)[1];
  const _thousandsSeparator = (1000).toLocaleString(locale)[1];
  const thousandsSeparator = /\d/.test(_thousandsSeparator)
    ? ''
    : _thousandsSeparator;

  const { symbol } = formats[currencyCode];

  return {
    decimalSeparator,
    symbol,
    thousandsSeparator,
  };
};

export default (
  value: number,
  { currencyCode = "gbp", locale = undefined }: ICurrencyOptions = {}
): string => {
  if (value === null || typeof value === "undefined") {
    // don't change condition to `!value` - zero is falsy
    return "";
  }

  const { decimalSeparator, symbol } = getChars({
    currencyCode,
    locale
  });

  const sign = +value < 0 ? "-" : "";
  const abs = Math.abs(+value);

  const hundredths = abs;
  const fractionalPart = hundredths % 100;
  const integerPart = (hundredths - fractionalPart) / 100;

  if (!Number.isInteger(integerPart)) {
    throw new TypeError(
      `Invalid conversion of ${primitiveValue} to currency string`
    );
  }

  const beforeDecimalSeparator = integerPart.toLocaleString(locale);
  // adds thousands separator
  // e.g. 10000 => '10,000' for en-GB locale

  const afterDecimalSeparator = `${Math.round(fractionalPart)}`.padEnd(2, "0");

  return `${sign}${symbol}${beforeDecimalSeparator}${decimalSeparator}${afterDecimalSeparator}`;
};

//   public fromView(
//     view: string,
//     { currencyCode = 'gbp', locale = undefined }: ICurrencyOptions = {}
//   ): number {
//     if (view === null || typeof view === 'undefined') {
//       // don't change condition to `!value` - zero is falsy
//       return null;
//     }

//     const { decimalSeparator, symbol, thousandsSeparator } = getChars({
//       currencyCode,
//       locale,
//     });

//     const isNegative = view[0] === '-';

//     const absoluteValue = parseFloat(
//       view
//         .replace('-', '')
//         .replace(symbol, '')
//         .split(thousandsSeparator)
//         .join('')
//         .replace(decimalSeparator, '.')
//     );

//     return isNegative ? 0 - absoluteValue : absoluteValue;
//   }
// }

// export class CurrencyErrorMessageFormatValueConverter {
//   constructor() {
//     this.currencyFormatValueConverter = new CurrencyFormatValueConverter();
//   }

//   private currencyFormatValueConverter;

//   public toView(message: string, ...passThroughArgs) {
//     return message.replace(/[0-9.]*\d/g, m => {
//       return m.length
//         ? this.currencyFormatValueConverter.toView(
//             +m,
//             ...passThroughArgs
//           )
//         : m;
//     });
//   }
// }
