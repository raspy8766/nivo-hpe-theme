import { ResponsiveBar } from '@nivo/bar'
import { linearGradientDef } from '@nivo/core'

import React, { useMemo, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import textSize from 'svg-text-size';
import { Box, Text } from 'grommet';
import { normalizeColor } from '../utils';
import { getColorName, getChartTheme } from './utils';

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

const getLeftTickMaxWidth = (data, keys) => {
  const labelWidths = data.flatMap((item) => keys.flatMap((key) => {
    const value = item[key];
    const normalizedValue = typeof value === 'number' ? Math.round(value) : value;
    return textSize(normalizedValue).width;
  }))
  return Math.max(...labelWidths);
};

const getColor = (color, theme) => {
  const primary = normalizeColor(getColorName(color, theme), theme);
  // TODO: get this from the theme as well (graph-1)
  const secondary = '#FFD63E';
  return [primary, secondary];
};

export const HpeThemeBarChart = ({
  data,
  barPadding = 'small',
  margin: marginProp = 'medium',
  keys,
  indexBy,
  groupMode = 'stacked',
  formatters = {
    left: value => value,
    right: value => value,
    bottom: value => value,
    top: value => value,
  },
  color,
}) => {
  const theme = useContext(ThemeContext);
  const marginObject = propMap.margin[marginProp] || propMap.margin.medium

  const opacity = color && color.opacity && theme.global.opacity[color.opacity];

  const margin = useMemo(() => ({
    ...marginObject,
    left: getLeftTickMaxWidth(data, keys, marginObject) + marginObject.left,
  }), [data, keys, marginObject]);

  const keyMaxWidth = useMemo(() => (
    Math.max(...keys.map(key => textSize(key).width))
  ), [keys]);

  const { 
    textColor,
    fontFamily,
    fontSize,
  } = getChartTheme(theme);

  // TODO: add support for... 
  //  * dynamic rotation of tic values when labels get to close together or overlap
  //  * Add support for not showing all labels (e.g. determine tickValues property)
  //    * Example options: { tickFrequency: 'all' | 'least' | 'most' }

  return (
    <Box style={{ width: 500, height: 300 }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        padding={propMap.barPadding[barPadding] || barPadding}
        colors={getColor(color, theme)}
        margin={margin}
        groupMode={groupMode}
        axisLeft={{
          format: formatters.left,
          // TODO: dynamically change this value based on chart height (parent container)
          tickValues: 5,
        }}
        axisBottom={{
          // tickRotation: '-30',
          format: formatters.bottom,
        }}
        theme={{
          fontFamily,
          fontSize,
          textColor,
        }}
        tooltip={({id, value, color: tooltipColor}) => (
          <Box direction='row'>
            <Box background={tooltipColor} style={{ height: '20px', width: '20px' }} />
            <Text margin={{ left: 'xsmall' }}>{id}</Text>
            <Text margin={{ left: 'xsmall' }}>{formatters.left(value)}</Text>
          </Box>
        )}
        legends={[{
          anchor: 'top-right',
          direction: 'row',
          translateY: -30,
          itemWidth: keyMaxWidth + 10,
          itemHeight: 10,
          symbolSize: 11,
        }]}
        defs={[
          linearGradientDef('opacity', [
            { offset: 0, color: 'inherit', opacity },
          ]),
        ]}
        fill={[{ match: '*', id: 'opacity' }]}
        enableLabel={false}
      />
    </Box>
  )
};
