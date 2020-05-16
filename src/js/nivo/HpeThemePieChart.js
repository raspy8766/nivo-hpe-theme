import { ResponsivePie } from '@nivo/pie';
import { Box, Text } from 'grommet';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { getChartTheme, getThemeColor, propMap, getChartColorScheme } from './utils';

const legend = (data, formatter, colorFormat) => (
  data.map(({ label, value, status }, index) => (
    <Box
      key={label}
      justify='between' 
      margin={{ horizontal: 'small' }}
      style={{ width: 300 }}
      direction='row'
    >
      <Box direction='row' align='center'>
        <Box
          round
          background={status ? colorFormat({ status }) : colorFormat[index]}
          style={{ width: 10, height: 10 }}
        />
        <Text size='xsmall' margin={{ left: 'xsmall' }}>
          {label}
        </Text>
      </Box>
      <Text size='xsmall'>
        {formatter ? formatter(value) : value}
      </Text>
    </Box>
  ),
));

export const HpeThemePieChart = ({
  data,
  margin = 'medium',
  formatter,
  chartType = 'pie',
  legendType = 'label-value',
}) => {
  const theme = useContext(ThemeContext);

  const colorFormat = data[0].status ?
  ({ status }) => getThemeColor(theme, status) :
  getChartColorScheme(theme);

  const legends = legendType === 'label' ? [{
      anchor: 'bottom',
      direction: 'row',
      translateY: 30,
      itemWidth: 100,
      itemHeight: 18,
      symbolSize: 10,
      symbolShape: 'circle',
    }] : [];

  // todo get parent container dimentions dynamically (e.g. https://www.npmjs.com/package/react-use-dimensions)
  return (
    <Box>
      <Box style={{ width: 300, height: 300 }}>
        <ResponsivePie
          data={data}
          margin={propMap.margin[margin]}
          sortByValue
          theme={getChartTheme(theme)}
          colors={colorFormat}
          startAngle={-180}
          innerRadius={chartType === 'donut' ? 0.75 : null}
          enableRadialLabels={false}
          enableSlicesLabels={false}
          isInteractive={false}
          legends={legends}
        />
      </Box>
      {legendType === 'label-value' && legend(data, formatter, colorFormat)}
    </Box>
    )
  }
