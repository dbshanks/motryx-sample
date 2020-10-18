import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import {
  Form,
  Button,
  TextArea,
  Loader,
  Grid,
  Segment,
  Label,
} from 'semantic-ui-react';
import styles from './editLog.module.scss';

const EditLog = ({ data }) => {
  const [form, setForm] = useState({
    date: data.date,
    user: data.user,
    vial_id: data.vial_id,
    zone_from: data.zone_from,
    zone_to: data.zone_to,
    diagnosis: data.diagnosis,
    description: data.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateLog();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateLog = async () => {
    try {
      const res = await fetch(
        `https://motryx-sample.vercel.app/${router.query.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      );
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
        <Loader active inline='centered' />
      ) : (
        <Form onSubmit={handleSubmit} className={styles.indexContainer}>
          <h1 className={styles.header}>Tracker Update</h1>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Segment padded color='teal'>
                  <Label attached='top left' color='grey' size='large'>
                    Date
                  </Label>
                  <Form.Input
                    fluid
                    // label='Date'
                    error={
                      errors.date
                        ? {
                            content: 'Please enter a valid date.',
                          }
                        : null
                    }
                    placeholder='Date'
                    name='date'
                    value={form.date}
                    onChange={handleChange}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment padded color='teal'>
                  <Label attached='top left' color='grey' size='large'>
                    User
                  </Label>
                  <Form.Input
                    fluid
                    // label='User'
                    error={
                      errors.user
                        ? {
                            content: 'Please enter a valid user id',
                          }
                        : null
                    }
                    placeholder='User'
                    name='user'
                    value={form.user}
                    onChange={handleChange}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment padded color='teal'>
                  <Label attached='top left' color='grey' size='large'>
                    Vial ID
                  </Label>
                  <Form.Input
                    fluid
                    type='text'
                    // label='Vial Id'
                    error={
                      errors.vial_id
                        ? { content: 'Please enter a valid Vial ID' }
                        : null
                    }
                    placeholder='Vial ID'
                    name='vial_id'
                    value={form.vial_id}
                    onChange={handleChange}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment padded color='teal'>
                  <Label attached='top left' color='grey' size='large'>
                    Zone From
                  </Label>
                  <Form.Input
                    fluid
                    type='text'
                    // label='Zone From'
                    error={
                      errors.zone_from
                        ? { content: 'Please enter a zone' }
                        : null
                    }
                    placeholder='Zone From'
                    name='zone_from'
                    value={form.zone_from}
                    onChange={handleChange}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment padded color='teal'>
                  <Label attached='top left' color='grey' size='large'>
                    Zone To
                  </Label>
                  <Form.Input
                    fluid
                    type='text'
                    // label='Zone To'
                    placeholder='Zone To'
                    error={
                      errors.zone_to ? { content: 'Please enter a zone' } : null
                    }
                    name='zone_to'
                    value={form.zone_to}
                    onChange={handleChange}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment padded color='teal'>
                  <Label attached='top left' color='grey' size='large'>
                    Interim Diagnosis
                  </Label>
                  <Form.Input
                    fluid
                    // label='Diagnosis'
                    error={
                      errors.diagnosis
                        ? {
                            content: 'A diagnosis entry is helpful',
                          }
                        : null
                    }
                    placeholder='Diagnosis'
                    name='diagnosis'
                    value={form.diagnosis}
                    onChange={handleChange}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Segment padded color='teal'>
                  <Label attached='top left' color='grey' size='large'>
                    Interim Diagnosis
                  </Label>
                  <TextArea
                    fluid
                    type='text'
                    cols='2000'
                    rows='8'
                    placeholder='Comments or Special Instructions'
                    name='description'
                    value={form.description}
                    onChange={handleChange}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button type='submit' className={styles.button} size='big'>
                  Update
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    </React.Fragment>
  );
};

EditLog.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`https://motryx-sample.vercel.app/api/dataset/${id}`);
  const { data } = await res.json();

  return { data: data };
};

export default EditLog;
