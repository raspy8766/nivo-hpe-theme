import { ResponsiveBar } from '@nivo/bar'
import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import React from 'react';
import { data } from '../../components/DataChart/data';
import { formatters } from '../utils';

const SimpleNivoChart = () => (
  <Grommet theme={grommet}>
    <Box style={{ width: 500, height: 300 }}>
      <ResponsiveBar
        data={
          data.map(item => ({ ...item, date: formatters.date()(item.date) }))
        }
        keys={[ 'percent' ]}
        indexBy="date"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        enableLabel={false}
      />
    </Box>
  </Grommet>
);

storiesOf('Nivo', module).add('No Theme Bar Chart', () => <SimpleNivoChart />);
