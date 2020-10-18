import Link from 'next/link';
import { Grid } from 'semantic-ui-react';
import styles from './navbar.module.scss';

const index = () => {
  return (
    <React.Fragment>
      <Grid.Row className={styles.navbar}>
        <Grid.Column className={styles.navbarWrapper}>
          <h1 className={styles.logo}>motryx</h1>
          <ul className={styles.leftnav}>
            <li className={styles.li}>
              <Link href='/'>New Tracker</Link>
            </li>
            <li className={styles.li}>
              <Link href='/loghistory'>Log History</Link>
            </li>
            <li className={styles.li}>
              <Link href='/metrics'>Metrics</Link>
            </li>
          </ul>
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  );
};

export default index;
