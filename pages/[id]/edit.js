import { Link } from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Row, Column } from '@Layout/Navbar/node_modules/@Layout/Grid';
import styles from './home.module.scss';

const Home = () => {
  const [form, setForm] = useState([
    {
      user: '',
      vial_id: '',
      zone_from: '',
      zone_to: '',
      description: '',
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createLog();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createLog = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/dataset', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      router.push('/loghistory');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};
    if (!form.user) {
      err.user = 'A user is required';
    }
    if (!form.zone_from) {
      err.zone_from = 'A sending zone must be entered';
    }
    if (!form.zone_to) {
      err.zone_to = 'A receiving zone must be entered.';
    }
    if (!form.vial_id) {
      err.vial_id = 'A valid Vial ID is required to process the tracking.';
    }
    return err;
  };
  return (
    <React.Fragment>
      {isSubmitting ? (
        <div>Loading....</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Row className={styles.formRow}>
            <Column col={3}>
              <label className={styles.label}>User</label>
              <input
                type='text'
                error={
                  errors.user
                    ? { content: 'Please enter a valid user id' }
                    : null
                }
                placeholder='User'
                name='user'
                onChange={handleChange}
              />
            </Column>
            <Column col={3}>
              <label className={styles.label}>Vial ID</label>
              <input
                type='text'
                error={
                  errors.vial_id
                    ? { content: 'Please enter a valid Vial ID' }
                    : null
                }
                placeholder='Vial ID'
                name='vial_id'
                onChange={handleChange}
              />
            </Column>
            <Column col={3}>
              <label className={styles.label}>Zone From</label>
              <input
                type='text'
                error={
                  errors.zone_from ? { content: 'Please enter a zone' } : null
                }
                placeholder='Zone From'
                name='zone_from'
                onChange={handleChange}
              />
            </Column>
            <Column col={3}>
              <label className={styles.label}>Zone To</label>

              <input
                type='text'
                placeholder='Zone To'
                error={
                  errors.zone_to ? { content: 'Please enter a zone' } : null
                }
                name='zone_to'
                onChange={handleChange}
              />
            </Column>
          </Row>

          <Row className={styles.formRow}>
            <Column col={12} className={styles.description}>
              <textarea
                type='text'
                cols='70'
                rows='8'
                placeholder='Comments or Special Instructions'
                name='description'
                onChange={handleChange}
              />
            </Column>
          </Row>
          <input type='submit' value='Create Log' className={styles.button} />
        </form>
      )}
    </React.Fragment>
  );
};

export default Home;
