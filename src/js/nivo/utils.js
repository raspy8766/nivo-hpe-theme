import { normalizeColor } from '../utils';

const dateSizeMap = {
  'month': { month: 'short' },
  'month-day': { month: 'short', day: '2-digit' },
  'month-day-year': { month: 'short', day: '2-digit', year: 'numeric' },
};

export const formatters = {
  date: ({ locale = 'en-US', size = 'month-day' } = {}) => (date) => (
    new Intl.DateTimeFormat(
      locale,
      dateSizeMap[size],
    ).format(
      date instanceof Date ? date : new Date(date),
    )
  ),
  number: ({ locale = 'en-US', size = 'compact' } = {}) => (number) => (
    new Intl.NumberFormat(
      locale,
      { notation: size, style: 'decimal' },
    ).format(number)
  ),
  currency: ({
    locale = 'en-US',
    currency = 'USD',
    size = 'compact',
  } = {}) => (number) => (
    new Intl.NumberFormat(
      locale,
      { style: 'currency', currency, notation: size },
    ).format(number)
  ),
};

export const propMap = {
  margin: {
    xsmall: { top: 25, right: 25, bottom: 25, left: 25 },
    small: { top: 40, right: 40, bottom: 40, left: 40 },
    medium: { top: 50, right: 50, bottom: 50, left: 50 },
    large: { top: 75, right: 75, bottom: 75, left: 75 },
    xlarge: { top: 100, right: 100, bottom: 100, left: 100 },
  },
};

export const getColorName = (color, theme) => {
  if (color && color.color) {
    return color.color;
  }
  if (color) {
    return color;
  }
  return theme.chart && theme.chart.color;
}

export const getChartColors = (theme) => (
  Object.entries(theme.global.colors)
    .filter(([colorKey]) => colorKey.includes('graph-'))
    .map(([, color]) => normalizeColor(getColorName(color, theme), theme))
);

export const getChartTheme = ({
  global: {
    colors: { dark: textColor },
    font: { family: fontFamily } },
  text: { xsmall: { size: fontSize } },
}) => ({
  fontFamily,
  fontSize,
  textColor,
});