import { Link } from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Form, Button, TextArea, Loader, Grid } from 'semantic-ui-react';
import styles from './home.module.scss';

const Home = () => {
  const [form, setForm] = useState([
    {
      date: '',
      user: '',
      vial_id: '',
      zone_from: '',
      zone_to: '',
      diagnosis: '',
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
    if (!form.date) {
      err.date = 'A valid date is required';
    }
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
    if (!form.diagnosis) {
      err.date = 'Providing a diagnosis is helpful';
    }
    return err;
  };
  return (
    <React.Fragment>
      {isSubmitting ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column>
                <Form.Input
                  fluid
                  label='Date'
                  error={
                    errors.date
                      ? {
                          content: 'Please enter a valid date.',
                        }
                      : null
                  }
                  placeholder='Date'
                  name='date'
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  label='User'
                  error={
                    errors.user
                      ? {
                          content: 'Please enter a valid user id',
                        }
                      : null
                  }
                  placeholder='User'
                  name='user'
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  type='text'
                  label='Vial Id'
                  error={
                    errors.vial_id
                      ? { content: 'Please enter a valid Vial ID' }
                      : null
                  }
                  placeholder='Vial ID'
                  name='vial_id'
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  type='text'
                  label='Zone From'
                  error={
                    errors.zone_from ? { content: 'Please enter a zone' } : null
                  }
                  placeholder='Zone From'
                  name='zone_from'
                  onChange={handleChange}
                />
              </Grid.Column>

              <Grid.Column>
                <Form.Input
                  fluid
                  type='text'
                  label='Zone To'
                  placeholder='Zone To'
                  error={
                    errors.zone_to ? { content: 'Please enter a zone' } : null
                  }
                  name='zone_to'
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  label='Diagnosis'
                  error={
                    errors.diagnosis
                      ? {
                          content: 'A diagnosis entry is helpful',
                        }
                      : null
                  }
                  placeholder='Diagnosis'
                  name='diagnosis'
                  onChange={handleChange}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid.Row>
            <Grid.Column>
              <TextArea
                type='text'
                cols='70'
                rows='8'
                placeholder='Comments or Special Instructions'
                name='description'
                onChange={handleChange}
              />
            </Grid.Column>
          </Grid.Row>
          <Button type='submit' secondary>
            Create Log
          </Button>
        </Form>
      )}
    </React.Fragment>
  );
};

export default Home;
