import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Table } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { COLUMNS } from '@Models/Columns';
import styles from './loghistory.module.scss';

const LogHistory = ({ data }) => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Table basic>
        <Table.Header>
          <Table.Row>
            {COLUMNS.map((item) => (
              <Table.HeaderCell key={item.Header}>
                {item.Header}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => {
            return (
              <Table.Row
                key={item._id}
                onClick={() => router.push(`/${item._id}`)}
                className={styles.rowHover}>
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>{item.vial_id}</Table.Cell>
                <Table.Cell>{item.zone_from}</Table.Cell>
                <Table.Cell>{item.zone_to}</Table.Cell>
                <Table.Cell>{item.user}</Table.Cell>
                <Table.Cell>{item.diagnosis}</Table.Cell>
                <Table.Cell width={5}>{item.description}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

LogHistory.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/dataset');
  const { data } = await res.json();
  return { data: data };
};

export default LogHistory;
