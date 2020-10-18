import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import { Doughnut } from 'react-chartjs-2';
import { Grid } from 'semantic-ui-react';
import styles from './metrics.module.scss';

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
          '#006064',
          '#00838F',
          '#0097A7',
          '#00ACC1',
          '#00BCD4',
          '#26C6DA',
          '#4DD0E1',
          '#80DEEA',
        ],
      },
    ],
  };

  const legend = {
    display: true,
    position: 'right',
    fullWidth: true,
    labels: {
      fontColor: '#212121',
    },
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
          '#006064',
          '#00838F',
          '#0097A7',
          '#00ACC1',
          '#00BCD4',
          '#26C6DA',
          '#4DD0E1',
          '#80DEEA',
        ],
      },
    ],
  };

  return (
    <Grid
      columns={2}
      verticalAlign='middle'
      className={styles.metricsContainer}>
      <Grid.Row>
        <Grid.Column>
          <h2 className={styles.zoneHeader}>Zone Pick Up</h2>
          <Doughnut data={zoneToData} legend={legend} />
        </Grid.Column>
        <Grid.Column>
          <h2 className={styles.zoneHeader}>Zone Drop Off</h2>
          <Doughnut data={zoneFromData} legend={legend} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Metrics.getInitialProps = async () => {
  const res = await fetch('https://motryx-sample.vercel.app/api/dataset');
  const { data } = await res.json();
  return { data: data };
};

export default Metrics;
