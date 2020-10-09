import React from 'react';
import { Container, Row, Column } from '@Layout/Grid';
import classes from '@Layout/Navbar/navbar.module.scss';

const index = () => {
  return (
    <React.Fragment>
      <Container width={100}>
        <Row>
          <Column col={12}>12</Column>
        </Row>
        <Row>
          <Column col={11}>11</Column>
          <Column col={1}>1</Column>
        </Row>
        <Row>
          <Column col={10}>10</Column>
          <Column col={2}>2</Column>
        </Row>
        <Row>
          <Column col={9}>9</Column>
          <Column col={3}>3</Column>
        </Row>
        <Row>
          <Column col={8}>8</Column>
          <Column col={4}>4</Column>
        </Row>
        <Row>
          <Column col={7}>7</Column>
          <Column col={5}>5</Column>
        </Row>
        <Row>
          <Column col={6}>6</Column>
          <Column col={6}>6</Column>
        </Row>
        <Row>
          <Column col={5}>5</Column>
          <Column col={7}>7</Column>
        </Row>
        <Row>
          <Column col={4}>4</Column>
          <Column col={8}>8</Column>
        </Row>
        <Row>
          <Column col={3}>3</Column>
          <Column col={9}>9</Column>
        </Row>

        <Row>
          <Column col={2}>2</Column>
          <Column col={10}>10</Column>
        </Row>
        <Row>
          <Column col={1}>1</Column>
          <Column col={11}>11</Column>
        </Row>
        <Row>
          <Column col={12}>12</Column>
        </Row>

        <Row>
          <Column>Column Fill</Column>
          <Column>Column Fill</Column>
          <Column>Column Fill</Column>
          <Column>Column Fill</Column>
        </Row>
        <Row>
          <Column>Column Fill</Column>
          <Column>Column Fill</Column>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default index;
