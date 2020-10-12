import React from 'react';
import Link from 'next/link';
import { Row, Column } from '@Layout/Grid';

const LogHistory = ({ data }) => {
  return (
    <div>
      <Row>
        <Column col={12}>
          <table>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.vial_id}</td>
                    <td>{item.zone_from}</td>
                    <td>{item.zone_to}</td>
                    <td>{item.user}</td>
                    <td>{item.description}</td>
                    <td>
                      <Link href={`/${item._id}`}>Edit</Link>
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
