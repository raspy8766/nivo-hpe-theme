import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from '../data';

const NoWrapText = styled.span`
  white-space: nowrap
`

const MultipleDataChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        chart={[
          // {
          //   key: 'percent',
          //   type: 'area',
          //   color: { color: 'graph-0', opacity: 'medium' },
          // },
          { key: 'percent', type: 'line', round: true },
          { key: 'percent', type: 'bar', thickness: 'hair' },
          { key: 'percent', type: 'point', round: true, thickness: 'small' },
        ]}
        xAxis={{
          guide: true,
          background: 'brand',
          // key: 'name',
          render: i => (
            <Box pad="xsmall" align="start">
            {/* <Box pad="xsmall" align="start" style={{ transform: 'rotate(45deg)' }}> */}
              <Text>
                {new Date(data[i].date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
              {/* <NoWrapText>{data[i].name}</NoWrapText> */}
            </Box>
          ),
        }}
        yAxis={{ guide: true }}
        steps={[data.length - 1, 6]}
        thickness="xsmall"
        gap="medium"
        pad="small"
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Multiple', () => <MultipleDataChart />);
