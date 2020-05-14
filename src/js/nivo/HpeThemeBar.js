import { ResponsiveBar, linearGradientDef } from 'nivo';
import React, { useMemo, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import textSize from 'svg-text-size';
import { normalizeColor } from '../utils';


const dateFormatter = (date) => (
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
);

const propMap = {
  barPadding: {
    hair: '.1',
    xsmall: '.2',
    small: '.3',
    medium: '.4',
    large: '.5',
    xlarge: '.6',
  },
  margin: {
    xsmall: { top: 25, right: 25, bottom: 25, left: 25 },
    small: { top: 40, right: 40, bottom: 40, left: 40 },
    medium: { top: 50, right: 50, bottom: 50, left: 50 },
    large: { top: 75, right: 75, bottom: 75, left: 75 },
    xlarge: { top: 100, right: 100, bottom: 100, left: 100 },
  },
}

const getLabelMaxWidth = (data, keys) => {
  const labelWidths = data.flatMap((item) => keys.flatMap((key) => {
    const value = item[key];
    const normalizedValue = typeof value === 'number' ? Math.round(value) : value;
    return textSize(normalizedValue).width;
  }))
  return Math.max(...labelWidths);
};

// {
//   axis: {
//       textColor: '#000',
//       fontSize: '11px',
//       tickColor: '#000',
//       legendColor: '#000',
//       legendFontSize: '11px',
//   },
//   grid: {
//       stroke: '#ddd',
//       strokeWidth: 1,
//       strokeDasharray: '',
//   },
//   markers: {
//       lineColor: '#000',
//       lineStrokeWidth: 1,
//       textColor: '#000',
//       fontSize: '11px',
//   },
//   dots: {
//       textColor: '#000',
//       fontSize: '11px',
//   },
//   tooltip: {
//       container: {
//           background: 'white',
//           color: 'inherit',
//           fontSize: 'inherit',
//           borderRadius: '2px',
//           boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
//           padding: '5px 9px',
//       },
//       basic: {
//           whiteSpace: 'pre',
//           display: 'flex',
//           alignItems: 'center',
//       },
//       table: {},
//       tableCell: {
//           padding: '3px 5px',
//       },
//   },
//   labels: {
//       textColor: '#000',
//   },
//   sankey: {
//       label: {},
//   },
// }


// todo pulls theme automatically from context
export const HpeThemeBarChart = ({
  data,
  barPadding = 'small',
  margin: marginProp = 'medium',
  keys,
  indexBy,
  color,
}) => {
  const theme = useContext(ThemeContext);
  const marginObject = propMap.margin[marginProp] || propMap.margin.medium

  let colorName;
  if (color && color.color) colorName = color.color;
  else if (color) colorName = color;
  else if (theme.chart && theme.chart.color) colorName = theme.chart.color;

  const normalizedColor = normalizeColor(colorName, theme);
  const opacity =
    color && color.opacity ? theme.global.opacity[color.opacity] : undefined;

  const margin = useMemo(() => ({
    ...marginObject,
    left: getLabelMaxWidth(data, keys, marginObject) + marginObject.left,
  }), [data, keys, marginObject]);

  const { 
    global: { colors: { dark: textColor } },
    text: { xsmall: { size: fontSize } },
  } = theme;

  // TODO: add support for... 
  //  * dynamic rotation of tic values when labels get to close together or overlap
  //  * Add support for not showing all labels (e.g. indexed by date)
  //    * Example options: { tickFrequency: 'all' | 'least' | 'most' }
  return (
    <ResponsiveBar
      data={
        data.map(item => ({ ...item, date: dateFormatter(item.date) }))
      }
      keys={keys}
      indexBy={indexBy}
      padding={propMap.barPadding[barPadding] || barPadding}
      colors={normalizedColor}
      margin={margin}
      axisLeft={{
        // format: v => `$${v}`,
      }}
      axisBottom={{
        // tickRotation: '-30',
        // format: v => `$${v}`,
      }}
      theme={{
        axis: {
            textColor,
            fontSize,
        },
      }}
      defs={[
        linearGradientDef('opacity', [
            { offset: 0, color: 'inherit', opacity },
        ]),
      ]}
      fill={[{ match: '*', id: 'opacity' }]}
      enableLabel={false}
    />
  )
};
