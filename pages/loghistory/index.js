import React from 'react';
import Link from 'next/link';
import { Row, Column } from '@Layout/Grid';
import styles from './loghistory.module.scss';
import { useRouter } from 'next/router';

const LogHistory = ({ data }) => {
  const router = useRouter();

  return (
    <div>
      <Row>
        <Column col={12}>
          <table>
            <thead>
              <tr>
                <th>Vial ID</th>
                <th>Zone From</th>
                <th>Zone To</th>
                <th>User</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr
                    key={item._id}
                    onClick={() => router.push(`/${item._id}`)}
                    className={styles.rowClicks}>
                    <td>{item.vial_id}</td>
                    <td>{item.zone_from}</td>
                    <td>{item.zone_to}</td>
                    <td>{item.user}</td>
                    <td>{item.description}</td>
                    <td>
                      <Link href={`/${item._id}`}>
                        <a>Edit</a>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Column>
      </Row>
    </div>
  );
};

LogHistory.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/dataset');
  const { data } = await res.json();
  // console.log(data);
  return { data: data };
};

export default LogHistory;
