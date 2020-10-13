import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Confirm, Button, Loader } from 'semantic-ui-react';

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
    <Grid.Row>
      {isDeleting ? (
        <Loader active />
      ) : (
        <Grid.Column>
          <p>{log.date}</p>
          <p>{log.vial_id}</p>
          <p>{log.user}</p>
          <p>{log.zone_to}</p>
          <p>{log.zone_from}</p>
          <p>{log.diagnosis}</p>
          <p>{log.description}</p>
          <Button color='red' onClick={open}>
            Delete
          </Button>
        </Grid.Column>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </Grid.Row>
  );
};

Log.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/dataset/${id}`);

  const { data } = await res.json();
  return { log: data };
};

export default Log;
