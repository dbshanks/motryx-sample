import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Grid, Confirm, Button, Loader } from 'semantic-ui-react';
import styles from './log.module.scss';

const Log = ({ log }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteLog();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteLog = async () => {
    const logId = router.query.id;
    try {
      const deleted = await fetch(
        `http://localhost:3000/api/dataset/${logId}`,
        {
          method: 'Delete',
        }
      );
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };
  return (
    <>
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <Grid columns={2} verticalAlign='middle'>
            <Grid.Row className={styles.logContainer}>
              <Grid.Column className={styles.column}>
                <h1 className={styles.heading}>{log.date}</h1>
                <h2 className={styles.vialID}>{log.vial_id}</h2>
                <h2 className={styles.userID}>
                  <span className={styles.staffLabel}>Staff:</span> {log.user}
                </h2>

                <h3 className={styles.diagnosis}>
                  <span className={styles.diagnosisLabel}>
                    Interim Diagnosis:
                  </span>{' '}
                  <br />
                  {log.diagnosis}
                </h3>
                <h2 className={styles.description}>{log.description}</h2>
              </Grid.Column>
              <Grid.Column className={styles.zoneContainer}>
                <div className={styles.zoneBorder}>
                  <h1 className={styles.zoneText}>
                    <small className={styles.subheading}>Pick Up Zone</small>
                    <br />
                    {log.zone_from}
                  </h1>
                  <h1 className={styles.zoneText}>
                    <small className={styles.subheading}>Drop Off Zone</small>
                    <br />
                    {log.zone_to}
                  </h1>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Link href={`/${log._id}/edit`}>
                  <Button secondary>Edit</Button>
                </Link>
                <Button color='teal' onClick={open}>
                  Delete
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      )}
      <Confirm
        open={confirm}
        onCancel={close}
        onConfirm={handleDelete}
        header='Remove tracker from log files.'
        content='Deleting is permanent. Double check tracker log before deletion.'
        cancelButton='Return to page'
        confirmButton='Delete Tracker'
      />
    </>
  );
};

Log.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/dataset/${id}`);

  const { data } = await res.json();
  return { log: data };
};

export default Log;
