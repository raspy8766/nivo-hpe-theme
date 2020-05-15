import { ResponsivePie } from '@nivo/pie';
import { Box, Text } from 'grommet';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { getChartColors, getChartTheme, propMap } from './utils';


const legend = (data, colors, formatter) => (
  data.map(({ label, value }, index) => (
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
          background={colors[index]}
          style={{ width: 10, height: 10 }}
        />
        <Text size='xsmall' margin={{ left: 'xsmall' }}>
          {label}
        </Text>
      </Box>
      <Text size='xsmall'>
        {formatter(value)}
      </Text>
    </Box>
  ),
));

export const HpeThemePieChart = ({
  data,
  margin = 'medium',
  formatter,
}) => {
  const theme = useContext(ThemeContext);
  const chartColors = getChartColors(theme);

  // todo get parent container dimentions dynamically (e.g. https://www.npmjs.com/package/react-use-dimensions)
  return (
    <Box>
      <Box style={{ width: 300, height: 300 }}>
        <ResponsivePie
          data={data}
          margin={propMap.margin[margin]}
          sortByValue
          theme={getChartTheme(theme)}
          colors={chartColors}
          startAngle={-180}
          enableRadialLabels={false}
          enableSlicesLabels={false}
          isInteractive={false}
        />
      </Box>
      {legend(data, chartColors, formatter)}
    </Box>
    )
  }
