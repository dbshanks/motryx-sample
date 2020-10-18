import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import { Doughnut } from 'react-chartjs-2';
import { Grid } from 'semantic-ui-react';

const Metrics = ({ data }) => {
  const zoneTo = [];
  const zoneFrom = [];

  data.map((item) => {
    zoneTo.push(item.zone_to);
    zoneFrom.push(item.zone_from);
  });

  const zoneToLabel = _.uniq(zoneTo).sort();
  const zoneFromLabel = _.uniq(zoneFrom).sort();

  const zoneFilter = (zoneAction, zone) => {
    return zoneAction.filter((item) => item === zone).length;
  };

  const zoneToData = {
    labels: [
      zoneToLabel[0],
      zoneToLabel[1],
      zoneToLabel[2],
      zoneToLabel[3],
      zoneToLabel[4],
      zoneToLabel[5],
      zoneToLabel[6],
      zoneToLabel[7],
    ],
    datasets: [
      {
        data: [
          zoneFilter(zoneTo, 'Day Surgery'),
          zoneFilter(zoneTo, 'ER'),
          zoneFilter(zoneTo, 'LAB'),
          zoneFilter(zoneTo, 'Maternity'),
          zoneFilter(zoneTo, 'Med Unit A'),
          zoneFilter(zoneTo, 'Med Unit B'),
          zoneFilter(zoneTo, 'Radiology'),
          zoneFilter(zoneTo, 'Recovery'),
        ],
        backgroundColor: [
          '#01579B',
          '#0277BD',
          '#0288D1',
          '#039BE5',
          '#03A9F4',
          '#29B6F6',
          '#4FC3F7',
          '#81D4FA',
        ],
      },
    ],
  };

  const zoneFromData = {
    labels: [
      zoneFromLabel[0],
      zoneFromLabel[1],
      zoneFromLabel[2],
      zoneFromLabel[3],
      zoneFromLabel[4],
      zoneFromLabel[5],
      zoneFromLabel[6],
      zoneFromLabel[7],
    ],
    datasets: [
      {
        data: [
          zoneFilter(zoneFrom, 'Day Surgery'),
          zoneFilter(zoneFrom, 'ER'),
          zoneFilter(zoneFrom, 'LAB'),
          zoneFilter(zoneFrom, 'Maternity'),
          zoneFilter(zoneFrom, 'Med Unit A'),
          zoneFilter(zoneFrom, 'Med Unit B'),
          zoneFilter(zoneFrom, 'Radiology'),
          zoneFilter(zoneFrom, 'Recovery'),
        ],
        backgroundColor: [
          '#01579B',
          '#0277BD',
          '#0288D1',
          '#039BE5',
          '#03A9F4',
          '#29B6F6',
          '#4FC3F7',
          '#81D4FA',
        ],
      },
    ],
  };

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Doughnut data={zoneToData} />
        </Grid.Column>
        <Grid.Column>
          <Doughnut data={zoneFromData} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Metrics.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/dataset');
  const { data } = await res.json();
  return { data: data };
};

export default Metrics;
