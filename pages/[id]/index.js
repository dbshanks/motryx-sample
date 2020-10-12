import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Column } from '@Layout/Grid';

const Log = ({ log }) => {
  //   const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteLog();
    }
  }, [isDeleting]);

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
  };
  return (
    <Row>
      {isDeleting ? (
        <div>Loading...</div>
      ) : (
        <Column col={4}>
          <p>{log.vial_id}</p>
          <p>{log.user}</p>
          <p>{log.zone_to}</p>
          <p>{log.zone_from}</p>
          <p>{log.description}</p>
          <button className='button' onClick={handleDelete}>
            Delete
          </button>
        </Column>
      )}
    </Row>
  );
};

Log.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/dataset/${id}`);

  const { data } = await res.json();
  return { log: data };
};

export default Log;
