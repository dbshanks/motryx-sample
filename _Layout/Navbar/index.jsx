import Link from 'next/link';
import { Row, Column } from '@Layout/Grid';
import styles from '@Layout/Navbar/navbar.module.scss';

const index = () => {
  return (
    <React.Fragment>
      <Row className={styles.navbar}>
        <Column col={12} className={styles.navbarWrapper}>
          <h1 className={styles.logo}>motryx</h1>
          <ul className={styles.leftnav}>
            <li className={styles.li}>
              <Link href='/tracking'>Tracking Input</Link>
            </li>
            <li className={styles.li}>
              <Link href='/history'>History</Link>
            </li>
            <li className={styles.li}>
              <Link href='/logs'>Logs</Link>
            </li>
          </ul>
        </Column>
      </Row>
    </React.Fragment>
  );
};

export default index;
