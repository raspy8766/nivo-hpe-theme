import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';


// const data = [
//   {
//     "name": "Name 1",
//     "date": "2020-07-01",
//     "percent": 5,
//   },
//   {
//     "name": "Name 2",
//     "date": "2020-07-02",
//     "percent": 47.942553860420304,
//   },
//   {
//     "name": "Name 3",
//     "date": "2020-07-03",
//     "percent": -84.14709848078965,
//   },
//   {
//     "name": "Name 4",
//     "date": "2020-07-04",
//     "percent": -60.74949866040545,
//   },
//   {
//     "name": "Name 5",
//     "date": "2020-07-05",
//     "percent": 90.92974268256818,
//   },
//   {
//     "name": "Name 6",
//     "date": "2020-07-06",
//     "percent": 59.847214410395644,
//   },
//   {
//     "name": "Name 7",
//     "date": "2020-07-07",
//     "percent": 14.112000805986721,
//   },
//   {
//     "name": "Name 8",
//     "date": "2020-07-08",
//     "percent": 35.07832276896198,
//   },
// ];

const data = [];
for (let i = 0; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    date: `2020-${((i % 12) + 1).toString().padStart(2, 0)}-01`,
    percent: Math.abs(v * 100),
  });
}

console.log(data)

const Example = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        chart={{ key: 'percent' }}
        xAxis
        yAxis={{ guide: true, labels: 10 }}
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Axes default', () => <Example />);
